import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download("punkt")
nltk.download("stopwords")

def preprocess_text(text):
    words = word_tokenize(text.lower())
    stop_words = set(stopwords.words("english"))
    return [w for w in words if w.isalnum() and w not in stop_words]
