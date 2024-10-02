'use client';

import { getLongId } from '@/frontend/service/idTranslatorService';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './slug.component.module.css';

interface Props {
   slug: string;
}

const phrases = {
   goHomeButton: 'Return to home page',
   welcome: 'Welcome!',
} as const;

export function SlugComponent({ slug }: Props) {

   const router = useRouter();

   useEffect(() => {
      async function validateUrl() {
         const response = await getLongId(slug);

          if (response.success) {
            router.push(response.longId as string);
          }
      }
      validateUrl();
   });

  return (
      <div className={styles['container']}>
         <div>
            {phrases.welcome}
         </div>
         <div>
            <Link
               href='/'
            >
               <button>
                  {phrases.goHomeButton}
               </button>
            </Link>
         </div>
      </div>
   );
}