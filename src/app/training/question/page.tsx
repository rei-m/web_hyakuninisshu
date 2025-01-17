import type { Metadata, NextPage } from 'next';

import { TrainingQuestionClientPage } from '@/app/components/pages/training/Question';

export const metadata: Metadata = {
  title: `百人一首 - 練習 -`,
};

const TrainingQuestionPage: NextPage = () => <TrainingQuestionClientPage />;

export default TrainingQuestionPage;
