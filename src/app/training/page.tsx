import type { Metadata, NextPage } from 'next';

import { TrainingClientPage } from '@/app/components/pages/training';
import { metadataDefalut } from '@/configs/meta';

const TITLE = `百人一首 - 練習 -`;
const DESCRIPTION = `百人一首の暗記を練習できます。出題条件を組み合わせて自分にあったペースで練習できます。百人一首の歌の意味に触れながら楽しく覚えましょう。`;

export const metadata: Metadata = {
  ...metadataDefalut,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`],
  openGraph: {
    ...metadataDefalut.openGraph,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    ...metadataDefalut.twitter,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const TrainingPage: NextPage = () => <TrainingClientPage />;

export default TrainingPage;