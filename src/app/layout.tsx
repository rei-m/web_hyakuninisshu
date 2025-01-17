import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { StoreProvider } from './StoreProvider';
import { metadataDefalut } from '@/configs/meta';

import { theme } from '@/theme';

const notoSansJp = Noto_Sans_JP({
  weight: '400',
  display: 'swap',
  variable: '--font-notsans',
  subsets: ['latin'],
});

export const metadata: Metadata = metadataDefalut;

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
        </head>
        <body className={notoSansJp.variable}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
          <script async src="//platform.twitter.com/widgets.js"></script>
          {process.env.NODE_ENV === 'production' && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4104372369598017"
              crossOrigin="anonymous"
            ></script>
          )}
        </body>
      </html>
    </StoreProvider>
  );
}
