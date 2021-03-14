import spacy
from textblob import TextBlob
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from youtube_transcript_api import YouTubeTranscriptApi

class Language:
    """
       This class is responsible for  Detecting the languages and translating them

    """

    def __init__(self, text):
        self.text = text

    def language_detect(self):
        return TextBlob(self.text).detect_language()

    def translater(self, lang):
        blob = TextBlob(self.text).translate(to=lang)
        return str(blob)


class Summarizer:
    """
        This class is responsible for summarizing the text

    """

    def __init__(self, text, percentage):
        self.text = text
        self.percentage = percentage
        

    def summarizer(self):
        nlp=spacy.load('en_core_web_sm')
        extra_words=list(STOP_WORDS)+list(punctuation)+['\n']
        docx = nlp(self.text)
        all_words = [word.text for word in docx]
        Freq_word = {}
        for w in all_words:
            w1 = w.lower()
            if w1 not in extra_words and w1.isalpha():
                if w1 in Freq_word.keys():
                    Freq_word[w1] += 1
                else:
                    Freq_word[w1] = 1
        val=sorted(Freq_word.values())
        max_freq=val[-3:]

        topic=""
        for word,freq in Freq_word.items():  
            
            if freq in max_freq:
                topic+=str(word)+" "
                
            else:
                continue
        for word in Freq_word.keys():  
                Freq_word[word] = (Freq_word[word]/max_freq[-1])
        sent_strength={}
        for sent in docx.sents:
            for word in sent :
            
                if word.text.lower() in Freq_word.keys():
                    
                    if sent in sent_strength.keys():
                        sent_strength[sent]+=Freq_word[word.text.lower()]
                    else:
                    
                        sent_strength[sent]=Freq_word[word.text.lower()]
                        
                else:
                    continue
        top_sentences=(sorted(sent_strength.values())[::-1])
        toppercent_sentence=int(self.percentage*len(top_sentences))
        top_sent=top_sentences[:toppercent_sentence]
        summary=[]
        for sent,strength in sent_strength.items():  
            if strength in top_sent:
                summary.append(sent)
                
            else:
                continue
        # full_text=topic+"\n"
        full_text=""
        for i in summary:
            full_text+=str(i)
        return full_text

    def full_summary(self):
        lang = Language(self.text).language_detect()
        if lang != 'en':
            translate_text = Language(self.text).translater("en")
            self.text = translate_text
            text_summary = self.summarizer()
            translate_text = Language(text_summary).translater(lang)
            return translate_text
        # result =self.summarizer()
        return self.summarizer()



       

if __name__ == '__main__':
    text = """There are broadly two types of extractive summarization tasks depending on what the summarization program focuses on. The first is generic summarization, which focuses on obtaining a generic summary or abstract of the collection (whether documents, or sets of images, or videos, news stories etc.). The second is query relevant summarization, sometimes called query-based summarization, which summarizes objects specific to a query. Summarization systems are able to create both query relevant text summaries and generic machine-generated summaries depending on what the user needs.
    An example of a summarization problem is document summarization, which attempts to automatically produce an abstract from a given document. Sometimes one might be interested in generating a summary from a single source document, while others can use multiple source documents (for example, a cluster of articles on the same topic). This problem is called multi-document summarization. A related application is summarizing news articles. Imagine a system, which automatically pulls together news articles on a given topic (from the web), and concisely represents the latest news as a summary.
    Image collection summarization is another application example of automatic summarization. It consists in selecting a representative set of images from a larger set of images.[3] A summary in this context is useful to show the most representative images of results in an image collection exploration system. Video summarization is a related domain, where the system automatically creates a trailer of a long video. This also has applications in consumer or personal videos, where one might want to skip the boring or repetitive actions. Similarly, in surveillance videos, one would want to extract important and suspicious activity, while ignoring all the boring and redundant frames captured.
    """
    # f=Summarizer(text,0.3).full_summary()
    # print(f)
    # print(f"before {len(text)} after {len(f)}")
