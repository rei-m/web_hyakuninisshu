import type { Metadata, NextPage } from 'next';

import { ExamClientPage } from '@/app/components/pages/exam';
import { metadataDefalut } from '@/configs/meta';

const TITLE = `百人一首 - 腕試し -`;
const DESCRIPTION = `百人一首の暗記を腕試しできます。百首覚えられているかチャレンジしましょう。`;

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

const ExamPage: NextPage = () => <ExamClientPage />;

export default ExamPage;