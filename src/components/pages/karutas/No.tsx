'use client';

import type { Karuta } from '@/domains/models';

import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import PageLayout from '@/components/organisms/PageLayout';
import Material from '@/components/organisms/Material';
import Heading from '@/components/atoms/Heading';
const Ad = dynamic(() => import('@/components/organisms/Ad'), { ssr: false });

import { karutaNoToJPNText } from '@/domains/models/KarutaNo';

import { ROUTING } from '@/configs/routing';

type KarutasNoPageProps = {
  karuta: Karuta;
};

const KarutasNoClientPage = ({ karuta }: KarutasNoPageProps) => {
  const karutaNoString = karutaNoToJPNText({ karutaNo: karuta.no });

  return (
    <PageLayout
      title={`百人一首 - ${karutaNoString} -`}
      isDisplayNav
      currentMenuType="material"
      backUrl={ROUTING.karutas()}
    >
      <Box
        component={'section'}
        sx={{
          boxSizing: 'border-box',
          padding: 2,
          width: '100%',
          backgroundColor: '#fffff0',
          textAlign: 'center',
        }}
      >
        <Ad type={`fixed`} sx={{ margin: 'auto' }} />
        <Heading level={2} sx={{ margin: 2 }}>
          {karutaNoString}
        </Heading>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Material karuta={karuta} />
        </Box>
      </Box>
      <Ad type={`fixed`} />
    </PageLayout>
  );
};

export default KarutasNoClientPage;
