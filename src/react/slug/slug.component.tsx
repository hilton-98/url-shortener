'use client';

import { baseUrl } from '@/model/baseUrl';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';


interface Props {
   slug: string;
}

export function SlugComponent({ slug }: Props) {

   useEffect(() => {
      async function validateUrl() {

         const response = await fetch("/api/getLongId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ shortId: slug }),
          });

          const data = await response.json();

          if (response.ok) {
            redirect(`${baseUrl}${data.longId}`);
          }

      }
      validateUrl();
   });

  return (
      <div>
         Hello There
      </div>
   );
}