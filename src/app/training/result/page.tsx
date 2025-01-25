import type { Metadata, NextPage } from 'next';

import { TrainingResultClientPage } from '@/components/pages/training/Result';

export const metadata: Metadata = {
  title: `百人一首 - 練習結果 -`,
};

const TrainingResultPage: NextPage = () => <TrainingResultClientPage />;

export default TrainingResultPage;
