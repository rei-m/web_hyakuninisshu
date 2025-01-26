import type { NextPage, Metadata, ResolvingMetadata } from 'next';

import KarutasNoClientPage from '@/components/pages/karutas/No';
import { karutaNoToJPNText } from '@/domains/models/KarutaNo';
import { KARUTA_LIST } from '@/assets/karuta';

type KarutasNoPageProps = {
  params: Promise<{
    no: string;
  }>;
};

export const generateStaticParams = async () => KARUTA_LIST.map((karuta) => ({ no: karuta.no.toString() }));

export const generateMetadata = async (
  { params }: KarutasNoPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { no } = await params;
  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata?.openGraph || {};
  const parentTwitter = parentMetadata?.twitter || {};

  const karuta = KARUTA_LIST[Number(no) - 1];
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

const KarutasNoPage: NextPage<KarutasNoPageProps> = async ({ params }) => {
  const { no } = await params;
  const karuta = KARUTA_LIST[Number(no) - 1];

  return <KarutasNoClientPage karuta={karuta} />;
};

export default KarutasNoPage;
