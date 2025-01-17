import { Metadata } from 'next';

const APP_TITLE = '百人一首 - 簡単に暗記 -';
const APP_DESCRIPTION =
  '百人一首を手軽に暗記するためのサイトです。百人一首の札の画像や現代語訳も載せていますので、百人一首の歌の意味に触れながら楽しく覚えましょう。百人一首とは、百人の歌人の和歌を一首ずつ集めて作られた歌集で、現代においてもかるた遊びや競技かるたなどに用いられます。';

export const metadataDefalut: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  keywords: [`百人一首`, `小倉百人一首`, `かるた`, `競技かるた`, `ちはやふる`, `暗記`, `練習`],
  openGraph: {
    siteName: APP_TITLE,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: ['https://hyakuninanki.net/icons/app-icon.png'],
  },
  twitter: {
    site: APP_TITLE,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    card: 'summary',
    creator: '@rei_m',
    images: ['https://hyakuninanki.net/icons/app-icon.png'],
  },
} as const;
