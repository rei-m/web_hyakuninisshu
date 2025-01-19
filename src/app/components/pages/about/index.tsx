'use client';

import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageLayout from '@/app/components/organisms/PageLayout';
import ReadingContent from '@/app/components/molecules/ReadingContent';
import AppStoreBanner from '@/app/components/atoms/AppStoreBanner';
import PlayStoreBanner from '@/app/components/atoms/PlayStoreBanner';
const Ad = dynamic(() => import('@/app/components/organisms/Ad'), { ssr: false });

import { ROUTING } from '@/configs/routing';

const AboutClientPage = () => (
  <PageLayout
    title={'百人一首 - サイトについて -'}
    isDisplayNav={true}
    currentMenuType={'other'}
    backUrl={ROUTING.root()}
  >
    <Box
      component={'section'}
      sx={{
        boxSizing: 'border-box',
        maxWidth: 960,
        p: 2,
        m: 'auto',
      }}
    >
      <ReadingContent title={`サイトについて`}>
        <Typography>
          このサイトは百人一首を覚えるためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
        </Typography>
      </ReadingContent>
      <Ad type={`responsive`} />
      <ReadingContent title={`使い方について`}>
        <Typography>
          練習では様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
          もう全部覚えたという方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。
          資料では百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
        </Typography>
      </ReadingContent>
      <ReadingContent title={`アプリ版`}>
        <Typography>
          よりサクサク使えるアプリ版を用意しています。百人一首の読み上げ形式も対応していますので、自信のついた方におすすめです。
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              paddingTop: 4,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <AppStoreBanner type="normal" />
            <AppStoreBanner type="reader" />
          </Box>
          <Box
            sx={{
              paddingTop: 4,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <PlayStoreBanner type="normal" />
            <PlayStoreBanner type="reader" />
          </Box>
        </Box>
      </ReadingContent>
      <Ad type={`responsive`} />
      <ReadingContent title={`運営者について`}>
        <Typography>
          当サイトは
          <a href="https://twitter.com/rei_m" target="_blank" rel="noopener noreferrer">
            @rei_m
          </a>
          が個人で運営しています。不具合や要望等あればTwitterまでご連絡ください。
          アプリのレビューで読み上げ機能が欲しいというお声をいただくのですが、使用可能ないい音源があれば搭載します。
        </Typography>
      </ReadingContent>
      <ReadingContent title={`漫画のコマ画像について`}>
        <Typography>
          サイト内の漫画のコマ画像は
          <a href="https://alu.jp/" target="_blank" rel="noopener noreferrer">
            アル
          </a>
          の「コマ投稿」機能により表示しております。
        </Typography>
      </ReadingContent>
      <ReadingContent title={`プライバシー ポリシー`}>
        <Typography>
          サイトの利用状況の把握や広告配信のためにGoogle社が提供しているサービスを利用しております。詳しくは
          <a href="https://rei-m.github.io/app/policy/" target="_blank" rel="noopener noreferrer">
            こちら
          </a>
        </Typography>
      </ReadingContent>
    </Box>
  </PageLayout>
);

export default AboutClientPage;
