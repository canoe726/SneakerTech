import requests
import pymysql
import re
from bs4 import BeautifulSoup

# FootSell
MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

base_url = "https://footsell.com"
url = "https://footsell.com/g2/bbs/board.php?bo_table=sneakernews&r=ok"
html = requests.get(url)
soup = BeautifulSoup(html.text, "html.parser")

items = soup.findAll("div", {"id":"list_table"})[0].findAll("div",{"class","wz_row box_shadow_3 relative"})

id_group = []
html = soup.findAll("div", {"id":"list_table"})[0].findAll("div",{"class","wz_row box_shadow_3 relative"})
html = str(html)

# page id 추출
while(html.find("list_row_") >= 0):
    idx = html.find("list_row_")
    e_idx = idx
    
    for i in range(idx, len(html)):
        if(html[i] == "\""): break
        else: e_idx += 1

    _id = html[(idx + 9):e_idx]
    id_group.append(_id)
    html = html[(e_idx + 1):]

print(id_group)

conn = pymysql.connect(host="localhost", user="root", password="123456", db="sneaker_tech", charset="utf8")
curs = conn.cursor()

for item_idx in range(len(items)):
    print("------------------------")
    # get Country
    country = items[item_idx].find('span', {'class':'phone_hide'}).find('a').text
    country = re.sub('[^ㄱ-힇]','', country)
    print(country)
    
    # get URL
    url = items[item_idx].find('a')['href']
    idx = url.find("&")
    url = url[:idx]
    url = url + '&wr_id=' + id_group[item_idx]
    url = base_url + url
    print(url)

    # Release Title
    title = items[item_idx].find("div",{"class":"wz_subject"}).find("span").text
    if(len(title) >= 30):
        title = title[:30] + "..."
    print(title)

    html = requests.get(url)
    soup = BeautifulSoup(html.text, "html.parser")

    # Release content
    p_texts = soup.find("div", {"class","resContents"}).findAll("p")

    idx = 0
    length = len(p_texts)
    while(idx < length):    # 공백 제거
        text = re.sub('[^0-9a-zA-Zㄱ-힇]','', p_texts[idx].text)
        if(len(text) <= 1):
            del p_texts[idx]
            idx -= 1
            length -= 1
        idx += 1

    content = ""
    for p in p_texts:
        content += (p.text + " ")

    if(len(content) >= 50):
        content = content[:50] + "..."
    print(content)

    # Release Image
    image = soup.find("div", {"class","resContents"}).findAll("img")
    image = image[0]['src']
    print(image)

    # SQL Query
    sql = "SELECT item_id FROM release_items WHERE title = '" + title + "'"
    curs.execute(sql)

    if(len(curs.fetchall()) == 0):
        sql = """INSERT INTO
                    release_items (country, image, title, content, url, page_title, clicked)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        curs.execute(sql, (country, image, title, content, url, "FootSell", "0"))
        conn.commit()

conn.close()


