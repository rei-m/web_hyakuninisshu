import type { Metadata, NextPage } from 'next';

import { ExamQuestionClientPage } from '@/components/pages/exam/Question';

export const metadata: Metadata = {
  title: `百人一首 - 腕試し -`,
};

const ExamQuestionPage: NextPage = () => <ExamQuestionClientPage />;

export default ExamQuestionPage;
