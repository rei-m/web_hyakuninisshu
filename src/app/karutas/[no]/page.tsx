import type { NextPage, Metadata, ResolvingMetadata } from 'next';

import Box from '@mui/material/Box';
import { PageLayout } from '@/app/components/organisms/PageLayout';
import { Material } from '@/app/components/organisms/Material';
import { Ad } from '@/app/components/organisms/Ad';
import { Heading } from '@/app/components/atoms/Heading';

import { karutaNoToJPNText } from '@/domains/models/KarutaNo';
import { karutaRepository } from '@/domains/repositories';

import { ROUTING } from '@/configs/routing';

import type { KarutaNo } from '@/domains/models';
import { Suspense } from 'react';

type KarutasNoPageProps = {
  params: Promise<{
    no: string;
  }>;
};

export const generateStaticParams = async () => karutaRepository.all().map((karuta) => ({ no: karuta.no.toString() }));

export const generateMetadata = async (
  { params }: KarutasNoPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { no } = await params;
  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata?.openGraph || {};
  const parentTwitter = parentMetadata?.twitter || {};

  const karuta = karutaRepository.findByNo({ karutaNo: Number(no) as KarutaNo });
  const karutaNoString = karutaNoToJPNText({ karutaNo: karuta.no });

  const title = `百人一首 - ${karutaNoString} -`;
  const description = `百人一首の${karutaNoString}の歌のページです。作者は${karuta.creator}です。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳を載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`;

  return {
    title,
    description,
    keywords: [`百人一首`, karutaNoString, karuta.creator, `小倉百人一首`, `歌`, `意味`, `歌番号`, `暗記`, `練習`],
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
    twitter: {
      ...parentTwitter,
      title,
      description,
    },
  };
};

const Content = async ({ params }: KarutasNoPageProps) => {
  const { no } = await params;
  const karuta = karutaRepository.findByNo({ karutaNo: Number(no) as KarutaNo });
  const karutaNoString = karutaNoToJPNText({ karutaNo: karuta.no });

  return (
    <Suspense>
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
    </Suspense>
  );
};

const KarutasNoPage: NextPage<KarutasNoPageProps> = async ({ params }) => (
  <Suspense>
    <Content params={params} />
  </Suspense>
);

export default KarutasNoPage;
