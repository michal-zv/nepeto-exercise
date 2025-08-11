import json
import os
from bs4 import BeautifulSoup
import requests
import urllib.parse
from typing import List, Dict
from flask import current_app

token = os.getenv("SCRAPEDO_API_TOKEN")
base_url = "https://www.walmart.com"


def set_url(query: str) -> str:
  """
  Construct the scraper API URL with the encoded Walmart search query.
  """
  target_url = urllib.parse.quote(f"{base_url}/search?q={query}")
  return "http://api.scrape.do/?token={}&url={}".format(token, target_url)


def get_raw_data(url):
  """
  Scrape Walmart from the url.
  Returns JSON with all the raw data.
  """
  current_app.logger.info(f"Fetching URL: {url}")
  
  try:
    response = requests.get(url)
    response.raise_for_status()
    current_app.logger.info(f"Successfully fetched URL: {url}")
  except requests.RequestException as e:
    current_app.logger.error(f"Request failed for URL {url}: {e}")
    raise
  
  soup = BeautifulSoup(response.text, 'html.parser')

  script_tag = soup.find("script", id="__NEXT_DATA__", type="application/json")
  if not script_tag:
    current_app.logger.error(f"__NEXT_DATA__ script tag not found at URL: {url}")
    raise Exception("Could not find __NEXT_DATA__ script tag")

  try:
    data = json.loads(script_tag.string)
    current_app.logger.info(f"JSON parsed successfully for URL: {url}")
  except json.JSONDecodeError as e:
    current_app.logger.error(f"Failed to parse JSON from {url}: {e}")
    raise Exception(f"Failed to parse JSON: {e}") from e

  return data


def parse_product_info(query: str) -> List[Dict]:
  """
  Accesses Walmart and gets product info by query.
  Returns a list of parsed product dictionaries.
  """
  url = set_url(query)
  raw_data = get_raw_data(url)
  
  items = safe_get_items(raw_data)
  parsed_data = []

  for item in items:
    if item.get("__typename") == "Product":
        parsed_data.append(extract_product_data(item))
  
  if not parsed_data:
    current_app.logger.info(f"No products found for query: {query}")
  
  return parsed_data


def get_price(product_id):
  """
  Returns product price by product_id from Walmart.
  Returns None if price not found or on error.
  """
  try:
    url = set_url(product_id)
    raw_data = get_raw_data(url)
    items = safe_get_items(raw_data)
    item = next((x for x in items if x.get("usItemId") == product_id), None)

    if not item:
      current_app.logger.info(f"Product {product_id} not found in items")
      return None

    price_info = item.get("priceInfo")
    if price_info and price_info.get("linePrice") is not None:
      return price_info["linePrice"]
    else:
      current_app.logger.info(f"PriceInfo missing or linePrice None for product {product_id}")
      return None

  except Exception as e:
    current_app.logger.error(f"Exception in get_price for product {product_id}: {e}", exc_info=True)
    return None



def extract_product_data(data):
  """
  Extracts from data JSON the needed fields.
  Returns object with necessary info (Product).
  """
  product_data = {}

  # Extract product_id
  product_id = data.get("usItemId")
  if product_id:
    product_data["product_id"] = product_id

  # Extract title
  name = data.get("name")
  if name:
    product_data["title"] = name

  # Extract price
  price_info = data.get("priceInfo")
  if price_info and price_info.get("linePrice") is not None:
    product_data["current_price"] = price_info["linePrice"]

  # Extract rating
  rating = data.get("averageRating")
  if rating:
    product_data["rating"] = rating

  # Extract image
  image = data.get("image")
  if image:
    product_data["image_url"] = image
  
  # Extract product_url
  canonical_url = data.get("canonicalUrl")
  if canonical_url:
    product_data["product_url"] = base_url + canonical_url

  # Extract category
  category = data.get("category")
  if category and category.get("path") is not None:
    product_data["category"] = category["path"]

  return product_data


def safe_get_items(raw_data):
  """
  Safely extract the 'items' list from raw_data dict.
  Returns list of items or empty list if any key is missing.
  """
  try:
    item_stacks = (
        raw_data.get("props", {})
                .get("pageProps", {})
                .get("initialData", {})
                .get("searchResult", {})
                .get("itemStacks", [])
    )
    if not item_stacks or not isinstance(item_stacks, list):
        current_app.logger.warning("Item stacks missing or invalid in raw_data")
        return []
      
    first_stack = item_stacks[0]
    return first_stack.get("items", [])
  except (AttributeError, IndexError, KeyError, TypeError) as e:
      current_app.logger.error(f"Error navigating raw_data: {e}")
      return []
