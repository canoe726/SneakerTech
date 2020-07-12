import requests
import pymysql
import re
from bs4 import BeautifulSoup

# Kasina
MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

base_url = "https://www.kasina.co.kr"
url = "https://www.kasina.co.kr/main/html.php?htmid=proc/datedrop.html"
html = requests.get(url)
soup = BeautifulSoup(html.text, "html.parser")

items = soup.findAll("ul", {"class":"dropdate datestock"})[0].findAll("li")

conn = pymysql.connect(host="localhost", user="root", password="123456", db="sneaker_tech", charset="utf8")
curs = conn.cursor()

for item in items:
    url = item.find("a")['href']
    if(url == "javascript:alert('SOLD OUT')"):
        continue

    print("-----------------------------------------")
    print(base_url + url)
    
    # get URL
    if(url.find('http:') >= 0): url = url
    else: url = base_url + url

    # Release Image
    image = item.find('img')['src']
    image = base_url + image

    p_texts = item.findAll('p')

    # Release Title
    title = p_texts[1].text

    # Release Content
    content = p_texts[2].text

    # Release Price
    price = ''
    for p in p_texts:
        if(p.text.find('won') >= 0):
            price = p.text
    price = re.sub('[^0-9]', '', price)

    # SQL Query
    sql = "SELECT item_id FROM release_items WHERE title = '" + title + "'"
    curs.execute(sql)

    if(len(curs.fetchall()) == 0):
        sql = """INSERT INTO
                    release_items (country, image, title, content, price, url, page_title, clicked)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
        curs.execute(sql, ("국내", image, title, content, price, url, "Kasina", "0"))
        conn.commit()

conn.close()


