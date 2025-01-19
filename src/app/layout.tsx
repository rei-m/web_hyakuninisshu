import type { Metadata } from 'next';

import { Suspense } from 'react';
import Script from 'next/script';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

import StoreProvider from '@/app/StoreProvider';
import GoogleAnalytics from '@/app/components/organisms/GoogleAnalytics';

import { Noto_Sans_JP } from 'next/font/google';

import { METADATA_DEFAULT } from '@/configs/meta';

import { theme } from '@/theme';

const notoSansJp = Noto_Sans_JP({
  weight: '400',
  display: 'swap',
  variable: '--font-notsans',
  subsets: ['latin'],
});

export const metadata: Metadata = METADATA_DEFAULT;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="ja">
        <head>
          <meta name="google-site-verification" content="nfztyFdR3vIkwPrEtbbyQV0zYuc4jK2tzG_SQ6jKMbg" />
          <Suspense>
            <GoogleAnalytics />
          </Suspense>
        </head>
        <body className={notoSansJp.variable}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
          <Script async strategy="afterInteractive" src="//platform.twitter.com/widgets.js" />

          {process.env.NODE_ENV === 'production' && (
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4104372369598017"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          )}
        </body>
      </html>
    </StoreProvider>
  );
}
