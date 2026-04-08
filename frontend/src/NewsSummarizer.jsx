import React, { useState } from "react";
import { Newspaper, Link, FileText, Loader2 } from "lucide-react";
import bgImage from "./assets/bg.jpg";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
).replace(/\/$/, "");

export default function NewsSummarizer() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("text");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Please enter text or URL");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "url" ? { url: input } : { text: input }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setSummary(data.summary);
    } catch {
      setError("Failed to summarize article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Glass card */}
      <div
        className="
          relative 
          max-w-4xl 
          w-full 
          bg-white/45 
          backdrop-blur-xl 
          rounded-2xl 
          shadow-2xl 
          p-8
          border border-white/20
        "
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Newspaper className="w-8 h-8 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-900">News Summarizer</h1>
        </div>

        <p className="text-gray-700 mb-6">
          Paste a news article or enter a URL to get an AI-powered summary
        </p>

        {/* Mode buttons */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode("text")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              mode === "text"
                ? "bg-gray-800 text-white"
                : "bg-white/70 text-gray-700 hover:bg-white/90"
            }`}
          >
            <FileText size={16} />
            Paste Text
          </button>

          <button
            onClick={() => setMode("url")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              mode === "url"
                ? "bg-gray-800 text-white"
                : "bg-white/70 text-gray-700 hover:bg-white/90"
            }`}
          >
            <Link size={16} />
            Enter URL
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "url"
              ? "Enter article URL (https://...)"
              : "Paste the news article text here..."
          }
          className="
            w-full 
            h-48 
            p-4 
            rounded-lg 
            border border-gray-300
            bg-white/60
            focus:border-gray-700 
            focus:outline-none 
            resize-none
          "
        />

        {error && <p className="text-red-600 mt-3">{error}</p>}

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2 disabled:bg-gray-500"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Summarizing...
              </>
            ) : (
              "Summarize"
            )}
          </button>

          <button
            onClick={() => {
              setInput("");
              setSummary("");
              setError("");
            }}
            className="px-6 py-3 rounded-lg border border-gray-400 bg-white/60 hover:bg-white/90 transition"
          >
            Clear
          </button>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mt-8 p-6 bg-white/65 rounded-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Summary
            </h2>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {/* Footer */}
      <div className="absolute bottom-4 right-6">
        <p className="text-white text-sm font-medium tracking-wide">
          Created by <span className="font-bold">Ajay</span> &{" "}
          <span className="font-bold">Hariharan</span>
        </p>
      </div>
    </div>
  );
}
