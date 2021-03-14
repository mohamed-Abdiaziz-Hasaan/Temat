from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textblob import TextBlob
from app import *
import babel
app = FastAPI()
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Text(BaseModel):
    text: str
    percentage:int


@app.post('/summary')
def summary(text: Text):
    lang=Language(text.text).language_detect()
    Summarized_text=Summarizer(text.text,text.percentage/100).full_summary()
    Reduced="{:.2f}".format(len(Summarized_text.split(" "))/len(text.text.split(" ")))
    blob_object = TextBlob(Summarized_text) 
    locale = babel.Locale.parse(lang)
    result={
        "Text":Summarized_text,
        "Language":locale.get_display_name(),
        "Reduced":str(round((len(Summarized_text)/len(text.text))*100))+"%",
        "Sentence":len(blob_object.sentences)
    }
    return result

