import requests
import pymysql
import re
from bs4 import BeautifulSoup

# Bodega
MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

def get_title(title):
    t_idx = 0
    delete = False
    for t in title:
        if(t != ":"):
            t_idx += 1
        else:
            delete = True
            break
    if(delete): title = title[(t_idx + 2):]
    return title

def get_date(date, url_date):
    d_idx = 0
    delete = False
    for d in date:
        if(d != ":"):
            d_idx += 1
        else:
            delete = True
            break
    if(delete): date = date[(d_idx + 2):]

    d_idx = 0
    d_idx = date.find("Available")
    date = date[:d_idx]

    if(date != "TB"):
        date = date.replace(",", "")
        date = date.split(" ")

        if(date[0].find("day") >= 0):
            del date[0]

        date[2] = re.sub('[^0-9]', '', date[2])

        mth = date[0]
        month = 1
        for m in MONTH:
            if(mth == m):
                break
            else:
                month += 1

        if(month < 10):
            month = str(month)
            month = "0" + month
        
        day = date[1]
        if(int(day) < 10): day = "0" + day
        
        return date[2] + "-" + str(month) + "-" + day
    else:
        cur_d = url_date.split("/")
        cur_d = cur_d[3]
        cur_d = cur_d.split("-")

        month = cur_d[0]
        if(int(month) < 10): month = "0" + month
        
        day = cur_d[1]
        if(int(day) < 10): day = "0" + day
        
        return "20" + cur_d[2] + "-" + month + "-" + day

def get_content(content):
    if(len(content) >= 50):
        content = content[:50] + "..."
    return content
    
def get_price(price):
    price = price.lower()
    p_idx = price.find("$")

    end_idx = -1
    for i in range(p_idx + 1, len(price)):
        if(i == len(price) - 1):
            end_idx = len(price)
        if(price[i] < "0" or price[i] > "9"):
            end_idx = i
            break

    return price[p_idx + 1:end_idx]

base_url = "https://bdgastore.com"
url = "https://bdgastore.com/blogs/upcoming-releases?page=1"
html = requests.get(url)
soup = BeautifulSoup(html.text, "html.parser")

items = soup.select("#shopify-section-blog-grid-2 li")

r_url = []        # link

conn = pymysql.connect(host="localhost", user="root", password="123456", db="sneaker_tech", charset="utf8")
curs = conn.cursor()

for item in items:
    # get release_url
    a_tag = item.find('a')
    next_url = a_tag['href']
    r_url.append(next_url)
    
for page_idx in range(len(r_url)):
    print(page_idx,": -----------------")
    url = base_url + r_url[page_idx]
    print(url)

    html = requests.get(url)
    soup = BeautifulSoup(html.text, "html.parser")

    content = soup.select("article")

    for item in content:
        shg_text = item.findAll("div", {"class":"shg-rich-text"})

        p_texts = shg_text[0].findAll("p")
        idx = 0
        length = len(p_texts)
        while(idx < length):    # 공백 제거
            text = re.sub('[^0-9a-zA-Zㄱ-힇]','', p_texts[idx].text)
            if(len(text) <= 1):
                del p_texts[idx]
                idx -= 1
                length -= 1
            idx += 1

        for i in range(len(p_texts)):
            p_text = p_texts[i].text
            if(p_text.find("Release") >= 0):    # 형식에 맞으면 가져온다
                # Release Title
                title = item.find("h1").text
                title = get_title(title)
                title = title.replace("'", "")
                print(title)
                
                # Release Date
                date = get_date(p_text, r_url[page_idx])
                #print(date)

                # Release Content
                content = ""
                if(len(p_texts) > i + 1):
                    content = p_texts[i + 1].text
                    content = get_content(content)
                    #print(content)

                # Release Price
                price = get_price(str(shg_text))
                #print(price)

                # Release Image
                image = item.findAll("img", {"class":"shogun-image shogun-lazyload"})
                #print(image[0]['data-src'])

                # SQL Query
                sql = "SELECT item_id FROM release_items WHERE title = '" + title + "'"
                curs.execute(sql)
                
                if(len(curs.fetchall()) == 0):
                    sql = """INSERT INTO
                                release_items (country, date, image, title, content, price, url, page_title, clicked)
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                    curs.execute(sql, ("해외", date, image[0]['data-src'], title, content, price, url, "Bodega", "0"))
                    conn.commit()
                    
                break

conn.close()


