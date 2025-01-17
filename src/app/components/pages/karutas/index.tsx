'use client';

import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import { PageLayout } from '@/app/components/organisms/PageLayout';
const Ad = dynamic(() => import('@/app/components/organisms/Ad'), { ssr: false });
import { Heading } from '@/app/components/atoms/Heading';
import { FilteredSmallMaterialList } from '@/app/containers/organisms/FilteredSmallMaterialList';
import { MaterialListFilter } from '@/app/containers/organisms/MaterialListFilter';

import { ROUTING } from '@/configs/routing';

const KarutasClientPage = () => (
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

export default KarutasClientPage;
