import requests
import pymysql
import re
from bs4 import BeautifulSoup

# Kasina
MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

base_url = "https://www.kasina.co.kr"
url = "https://www.nike.com/kr/launch/?type=feed"
html = requests.get(url)
soup = BeautifulSoup(html.text, "html.parser")

print(soup)


