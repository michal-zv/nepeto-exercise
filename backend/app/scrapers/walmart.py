import json
import os
from bs4 import BeautifulSoup
import requests
import urllib.parse

token = os.getenv("SCRAPEDO_API_TOKEN")
base_url = "https://www.walmart.com"
# target_url = urllib.parse.quote(f"{base_url}/search?q=bag")
# target_url = urllib.parse.quote("https://www.walmart.com/ip/Livhil-Mesh-Beach-Bag-Rope-Handles-Mesh-Tote-Bag-for-Women-Contains-Wicker-Oversized-Beach-Tote-Bag-with-9-Small-Pockets-Black/1695385755?classType=VARIANT")

# url = "http://api.scrape.do/?token={}&url={}".format(token, target_url)

def set_url(query):
  target_url = urllib.parse.quote(f"{base_url}/search?q={query}")
  return "http://api.scrape.do/?token={}&url={}".format(token, target_url)


def get_info(url):
  response = requests.get(url)
  response.raise_for_status()

  # Get the clean HTML content from the response
  html_content = response.text
  soup = BeautifulSoup(html_content, 'html.parser')

  # with open("page_dump.html", "w", encoding="utf-8") as f:
  #   f.write(soup.prettify())

  script_tag = soup.find("script", id="__NEXT_DATA__", type="application/json")
  if not script_tag:
      raise Exception("Could not find __NEXT_DATA__ script tag")

  try:
    data = json.loads(script_tag.string)
  except json.JSONDecodeError as e:
    raise Exception(f"Failed to parse JSON: {e}")
  
  # with open("next_data.json", "w", encoding="utf-8") as f:
  #   json.dump(data, f, ensure_ascii=False, indent=2)

  items = data["props"]["pageProps"]["initialData"]["searchResult"]["itemStacks"][0]["items"]
  parsed_data = []

  for item in items:
     parsed_data.append(extract_product_data(item))

  # with open("test.json", "w", encoding="utf-8") as f:
  #   json.dump(parsed_data, f, ensure_ascii=False, indent=2)

  return parsed_data


def extract_product_data(data):
    product_data = {}

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

# get_info(url)