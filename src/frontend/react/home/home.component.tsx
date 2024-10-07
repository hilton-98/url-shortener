'use client';

import { baseUrl } from "@/frontend/model/baseUrl";
import { getShortId } from "@/frontend/service/idTranslatorService";
import { useState } from "react";

import styles from './home.component.module.css';

const phrases = {
   invalidUrlMessage: `Please enter a valid URL`,
   shortenedUrl: 'Shortened URL: ',
   submitButton: 'Shorten URL',
   title: 'URL Shortener',
   urlPlaceholder: 'Enter your URL',
} as const;

export function HomeComponent() {

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const isValidUrl = (url: string) => {
   const urlPattern = /^https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+$/;
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

    const longId = url.replace(baseUrl, '');
    const response = await getShortId(longId);
    if (response.success) {
      setShortenedUrl(`${baseUrl}${response.shortId}`);
    } else {
      setErrorMessage(response.message);
    }
  };

  const ErrorMessage = () => {
   return errorMessage ? <div>{errorMessage}</div> : null;
  };

  const ShortenedUrl = () => {
   return shortenedUrl ? <a href={shortenedUrl}>{shortenedUrl}</a> : null;
  }

  return (
    <div className={styles['container']}>
      <h1>{phrases.title}</h1>
      <form 
        className={styles['input-form']}
        onSubmit={handleSubmit}
      >
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