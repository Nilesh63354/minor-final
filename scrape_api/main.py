from fastapi import Body, FastAPI
from pydantic import BaseModel
import requests
import enchant
from bs4 import BeautifulSoup
import pymongo as pm
client=pm.MongoClient("mongodb+srv://affithusky:ashish123@bookdatabase.7xuu112.mongodb.net/?retryWrites=true&w=majority")
db=client.get_database('books')

app = FastAPI()


class Post(BaseModel):
    title: str


class Keyf(BaseModel):
    keyword: str


@app.get("/prob")
def prob():
    return{"Message : done"}

@app.post("/check")
def create_post(payload: Keyf):
    urlf = "https://www.amazon.in/s?k="
    urlb = "&i=stripbooks&crid=3FNEKH8IYY6P1&sprefix=queenie+meanie+and+reeny%2Cstripbooks%2C208&ref=nb_sb_noss"
    dicto = enchant.Dict("en_US")
    spell = True
    for i in payload.keyword.split(" "):
        if (dicto.check(i) == 0):
            spell = False
    if (spell == False):
        return {"Message": "The given Spelling is Wrong"}
    if (check_book(payload.keyword) == False):
        return {"Message": "Wrong Book Name"}

    return {"Message": "The book name is Right"}


def check_book(title):
    url = f"https://openlibrary.org/search.json?q={title}"
    response = requests.get(url)
    data = response.json()
    if "docs" in data and len(data["docs"]) > 0:
        return True
    else:
        return False


@app.post("/scrape")
async def libgen(word: Keyf):
    try:
        key=(word.keyword).replace(" ", "_").lower()
        db.create_collection(key)
        coll=db.get_collection(key)
    except e:
        print(e)

    try:
        print('1')
        add_list=[] #List to be inserted in mongo db
        result = ''
        urlf = "https://libgen.li/index.php?req="
        urlb = "&columns%5B%5D=t&columns%5B%5D=a&columns%5B%5D=s&columns%5B%5D=y&columns%5B%5D=p&columns%5B%5D=i&objects%5B%5D=f&objects%5B%5D=e&objects%5B%5D=s&objects%5B%5D=a&objects%5B%5D=p&objects%5B%5D=w&topics%5B%5D=l&topics%5B%5D=c&topics%5B%5D=f&topics%5B%5D=a&topics%5B%5D=m&topics%5B%5D=r&topics%5B%5D=s&res=25&filesuns=all&curtab=f&order=&ordermode=desc&filesuns=all&page="
        key = (word.keyword).replace(" ", "+")
        URL = urlf+key+urlb
        count = 0
        for round in range(1, 2):
            result = requests.get(url=URL+str(round))
            soup = BeautifulSoup(result.text, "html.parser")
            table = soup.tbody
            try:
                table_body = table.contents
            except:
                return {"Message ": "No. of pages scrapped are "+str(count)}
            count = count+1
            for i in table_body:
                t_item= dict()
                try:
                    td = i.contents
                    # td[1] is for book name
                    s = td[1].find_all("a")
                    l = list(str(s[0]).split('>'))
                    bookname = l[1][0:-2]
                    if ((bookname.find('>') == True) or (bookname.find('<') == True) or len(bookname) == 0):
                        bookname = str(s[1]).split('>')[1][0:-2]
                    t_item["name"]=bookname
                    author = str(td[3].string)
                    t_item["author"]=author
                    link = list()
                    try:
                        for j in td[17].nobr.findAll("a", title=["gen.lib.rus.ec", "libgen"]):
                            link.append(str(j["href"]))
                        t_item["link"]=link[0]
                    except:
                        continue
                    t_item["provider"]="Libgen"
                    add_list.append(t_item)
                except:
                    continue
    except:
        print("Error in Libgen")
        
    #Project Gutenberg
    try:
        print('2')
        urlf = "https://www.gutenberg.org/ebooks/search/?query="
        urlb = "&submit_search=Search"
        key = word.keyword.replace(" ", "+")
        URL = urlf+key+urlb

        result = requests.get(url=URL)
        soup = BeautifulSoup(result.text, "html.parser")
        result = soup.find("ul", attrs={"class": "results"})
        books = result.find_all("li", attrs={"class": "booklink"})
        if (len(books) == 0):
            exit

        for book in books:
            t_item= dict()
            ab = book.a
            link = "https://www.gutenberg.org"+str(ab["href"])
            x = ab.find("span", attrs={"class": "title"})
            name = str(x.string)
            t_item["name"]=name
            sub = ""
            try:
                z = ab.find("span", attrs={"class": "subtitle"})
                sub = str(z.string)

            except:
                sub = " "

            t_item["author"]=sub
            t_item["link"]=link
            t_item['provider']="Gutenberg.org"
            add_list.append(t_item)
    except:
        print("Gutenberg")

    
    #pdf drive
    try:
        print("3")
        urlf = "https://www.pdfdrive.com/"
        urlb = "-books.html"
        key = word.keyword.replace(" ", "-")
        URL = urlf+key+urlb
        result = requests.get(url=URL)
        soup = BeautifulSoup(result.text, "html.parser")
        division = soup.find("div", attrs={"class": "dialog-left"})
        list = division.find_all("li")
        if (len(list) == 0):
            print("pdf drive")
            exit
        for element in list:
            t_item= dict()
            try:
                e = element.find("div", attrs={"class": "file-right"})
                link = "https://www.pdfdrive.com"+str(e.a["href"])
                name = str(e.h2)
                name = name.replace("<h2>", "")
                name = name.replace("</h2>", "")
                name = name.replace("<b>", "")
                name = name.replace("</b>", "")

                t_item["name"]=name
                t_item["link"]=link
                t_item["author"]="NIL"
                t_item["provider"]="PdfDrive"
                add_list.append(t_item)
            except:
                continue
    except:
        print("nothing")
    

    # Free E books
    try:
        print('4')
        urlf = "https://www.free-ebooks.net/search/"
        key = word.keyword .replace(" ", "+")
        URL = urlf+key
        result = requests.get(url=URL)
        soup = BeautifulSoup(result.text, "html.parser")
        try:
            chup = soup.find("div", attrs={"class": "col-sm-24 mt20"})
            # print()
            if (str(chup.strong.string) == "no results"):
                exit
        except:
            t="loop"

        alll = soup.find_all("div", attrs={"class": "row laText"})
        for elements in alll:
            t_item= dict()
            chq = elements.find("div", attrs={"class": "col-sm-20 mt10"})
            name = str(chq.h3.string)
            link = "https://www.free-ebooks.net" + str(chq.h3.a["href"])
            author = str(chq.div.div.a.string)

            t_item["name"]=name
            t_item["author"]=author
            t_item["link"]=link
            t_item["provider"]="Free Ebooks"
            add_list.append(t_item)
    except:
        print("error in Free Ebook")

    print(len(add_list))
    print(add_list)
    coll.insert_many(add_list)
    return {"Message : Sucesfully Scraped"}



