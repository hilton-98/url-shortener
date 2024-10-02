'use client';

import { useState } from "react";

const phrases = {
   shortenedUrl: 'Shortened URL:',
   submitButton: 'Shorten URL',
   title: 'URL Shortener',
   urlPlaceholder: 'Enter your URL',
} as const;

export function HomeComponent() {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setShortenedUrl(data.shortUrl);
  };

  return (
    <div>
      <h1>{phrases.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder={phrases.urlPlaceholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">{phrases.submitButton}</button>
      </form>

      {shortenedUrl && (
        <div>
          <p>{phrases.shortenedUrl}<a href={shortenedUrl}>{shortenedUrl}</a></p>
        </div>
      )}
    </div>
  );
}