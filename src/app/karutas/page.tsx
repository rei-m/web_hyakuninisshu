import type { Metadata, NextPage } from 'next';

import KarutasClientPage from '@/app/components/pages/karutas';

import { METADATA_DEFAULT } from '@/configs/meta';

const TITLE = `百人一首 - 資料 -`;
const DESCRIPTION = `百人一首の資料のページです。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳を載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`;

export const metadata: Metadata = {
  ...METADATA_DEFAULT,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`],
  openGraph: {
    ...METADATA_DEFAULT.openGraph,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    ...METADATA_DEFAULT.twitter,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const KarutasPage: NextPage = () => <KarutasClientPage />;

export default KarutasPage;
