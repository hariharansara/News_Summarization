from nltk.tokenize import sent_tokenize, word_tokenize
from collections import Counter
from utils.preprocess import preprocess_text

def summarize_text(text, max_sentences=4):
    sentences = sent_tokenize(text)
    words = preprocess_text(text)

    freq = Counter(words)
    sentence_scores = {}

    for sentence in sentences:
        for word in word_tokenize(sentence.lower()):
            if word in freq:
                sentence_scores[sentence] = sentence_scores.get(sentence, 0) + freq[word]

    top_sentences = sorted(
        sentence_scores, key=sentence_scores.get, reverse=True
    )[:max_sentences]

    return " ".join(top_sentences)
