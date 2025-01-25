'use client';

import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import PageLayout from '@/components/organisms/PageLayout';
import FilteredSmallMaterialList from '@/containers/organisms/FilteredSmallMaterialList';
import MaterialListFilter from '@/containers/organisms/MaterialListFilter';
import Heading from '@/components/atoms/Heading';
const Ad = dynamic(() => import('@/components/organisms/Ad'), { ssr: false });

import { ROUTING } from '@/configs/routing';

const KarutasClientPage = () => (
  <PageLayout
    title={`百人一首 - 資料 -`}
    isDisplayNav
    currentMenuType="material"
    backUrl={ROUTING.root()}
    isDisplaySearch
  >
    <Box component={'section'} sx={{ boxSizing: 'border-box', p: 2, width: '100%', textAlign: 'center' }}>
      <Heading level={2} sx={{ m: 2, textAlign: 'center' }}>
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
