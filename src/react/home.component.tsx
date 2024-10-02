'use client';

import { useState } from "react";

const phrases = {
   invalidUrlMessage: 'Please enter a URL of the form http://localhost:8080/{slug}',
   shortenedUrl: 'Shortened URL:',
   submitButton: 'Shorten URL',
   title: 'URL Shortener',
   urlPlaceholder: 'Enter your URL',
} as const;

export function HomeComponent() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const isValidUrl = (url: string) => {
   const urlPattern = /^http:\/\/localhost:8080\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+$/;
   return urlPattern.test(url);
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

   if (!isValidUrl(url)) {
      setErrorMessage(phrases.invalidUrlMessage);
      return;
   } else {
      setErrorMessage(undefined);
   }

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

  const ErrorMessage = () => {
   return errorMessage ? <div>{errorMessage}</div> : null;
  };

  const ShortenedUrl = () => {
   return shortenedUrl ? <a href={shortenedUrl}>{shortenedUrl}</a> : null;
  }

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
      <div>
         <p>{phrases.shortenedUrl}<ShortenedUrl /></p>
      </div>
      <ErrorMessage />
    </div>
  );
}