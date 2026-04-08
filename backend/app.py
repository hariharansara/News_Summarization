from flask import Flask, request, jsonify
from flask_cors import CORS
from model.summarizer import summarize_text
from utils.url_extractor import extract_text_from_url

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "News Summarizer Backend Running"

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text")
    url = data.get("url")

    if url:
        text = extract_text_from_url(url)

    if not text or len(text) < 100:
        return jsonify({"error": "Invalid article"}), 400

    summary = summarize_text(text)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)
