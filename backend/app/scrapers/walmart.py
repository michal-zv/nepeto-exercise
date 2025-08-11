import json
import os
from bs4 import BeautifulSoup
import requests
import urllib.parse
from flask import current_app

token = os.getenv("SCRAPEDO_API_TOKEN")
base_url = "https://www.walmart.com"


def set_url(query):
  target_url = urllib.parse.quote(f"{base_url}/search?q={query}")
  return "http://api.scrape.do/?token={}&url={}".format(token, target_url)


def get_raw_data(url):
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

def parse_product_info(query):
  url = set_url(query)
  raw_data = get_raw_data(url)

  items = raw_data["props"]["pageProps"]["initialData"]["searchResult"]["itemStacks"][0]["items"]
  parsed_data = []

  for item in items:
    if item.get("__typename") == "Product":
        parsed_data.append(extract_product_data(item))
  
  return parsed_data

def get_price(pid):
  url = set_url(pid)
  raw_data = get_raw_data(url)

  res = raw_data["props"]["pageProps"]["initialData"]["searchResult"]["itemStacks"][0]["items"]
  item = next((x for x in res if x.get("usItemId") == pid), None)
  
  price_info = item.get("priceInfo")
  if price_info and price_info.get("linePrice") is not None:
    return price_info["linePrice"]

def extract_product_data(data):
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