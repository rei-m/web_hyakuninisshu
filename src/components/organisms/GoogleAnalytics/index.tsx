'use client';

import { useEffect } from 'react';

import Script from 'next/script';

import { usePathname, useSearchParams } from 'next/navigation';

const GA_TAG_ID = 'UA-46787228-6';

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    window.gtag('config', GA_TAG_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`} />
      )}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TAG_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
