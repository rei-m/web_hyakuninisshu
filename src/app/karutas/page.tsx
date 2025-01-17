import type { Metadata, NextPage } from 'next';

import Box from '@mui/material/Box';
import { PageLayout } from '@/app/components/organisms/PageLayout';
import { Ad } from '@/app/components/organisms/Ad';
import { Heading } from '@/app/components/atoms/Heading';
import { FilteredSmallMaterialList } from '@/app/containers/organisms/FilteredSmallMaterialList';
import { MaterialListFilter } from '@/app/containers/organisms/MaterialListFilter';

import { ROUTING } from '@/configs/routing';
import { metadataDefalut } from '@/configs/meta';

const TITLE = `百人一首 - 資料 -`;
const DESCRIPTION = `百人一首の資料のページです。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳を載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`;

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

const KarutasPage: NextPage = () => (
  <PageLayout
    title={`百人一首 - 資料 -`}
    isDisplayNav
    currentMenuType="material"
    backUrl={ROUTING.root()}
    isDisplaySearch
  >
    <Box component={'section'} sx={{ boxSizing: 'border-box', padding: 2, width: '100%' }}>
      <Heading level={2} sx={{ margin: 2, textAlign: 'center' }}>
        歌一覧
      </Heading>
      <Ad type={`responsive`} />
      <FilteredSmallMaterialList />
      <Ad type={`responsive`} />
    </Box>
    <MaterialListFilter />
  </PageLayout>
);

export default KarutasPage;
