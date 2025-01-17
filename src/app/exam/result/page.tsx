import type { Metadata, NextPage } from 'next';

import { ExamResultClientPage } from '@/app/components/pages/exam/Result';

export const metadata: Metadata = {
  title: `百人一首 - 腕試し結果 -`,
};

const ExamResultPage: NextPage = () => <ExamResultClientPage />;

export default ExamResultPage;
