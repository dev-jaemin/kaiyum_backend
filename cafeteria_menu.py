from bs4 import BeautifulSoup
import requests
import re
import json
from datetime import datetime, timedelta

def converToString(raw):
    raw_list = ""
    for x in raw:
        raw_list += str(x)
    result = re.sub(r'\s','',raw_list)
    result = result.replace('<ulclass="list-1st">','').replace('</ul>','').replace('<br/>','\n')
    return result

def extractMenu(url):
    data = requests.get(url).text
    soup = BeautifulSoup(data, 'lxml')
    table = soup.find('table')
    
    raw_morning = table.find('td')
    raw_lunch = table.find('ul', class_="list-1st")
    raw_dinner = raw_lunch.find_next('ul', class_="list-1st")

    morning = converToString(raw_morning)
    lunch = converToString(raw_lunch)
    dinner = converToString(raw_dinner)

    return {"morning": morning, "lunch": lunch, "dinner": dinner}


if __name__ == '__main__':
    now = datetime.now() + timedelta(hours=9)
    date_string = now.strftime("&stt_dt=%Y-%m-%d")
    urls = ["https://kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=fclt",
            "https://kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=west",
            "https://kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=east1",
            "https://kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=east2",
            "https://kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=emp"]
    cafes = ["fclt", "west", "east1", "east2", "emp"]

    menuDict = {}

    for i in range(len(urls)):
        menuDict[cafes[i]] = extractMenu(urls[i] + date_string)
    
    with open("/root/kaiyum_backend/CampusMenu.json", "w") as outfile:
        json.dump(menuDict, outfile, ensure_ascii=False)
    