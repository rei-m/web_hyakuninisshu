import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import AdTop from '@src/components/AdTop';
import AdResponsive from '@src/components/AdResponsive';
import { MenuType } from '@src/enums';
import { SiteMetaData } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';

export interface Props {
  data: {
    site: {
      siteMetadata: Pick<SiteMetaData, 'description'>;
    };
  };
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing2x};
  box-sizing: border-box;
  max-width: 960px;
  margin: auto;
  text-align: left;
`;

const Section = styled.section`
  margin: ${({ theme }) => theme.spacing4x} 0;
`;

const SectionTitle = styled.h1`
  font-size: 2.4rem;
  position: relative;
  &:after {
    content: '';
    width: 100%;
    border-bottom: 1px solid #a9a9a9;
    position: absolute;
    bottom: -8px;
    left: 0;
  }
`;

const SectionText = styled.div`
  padding: ${({ theme }) => theme.spacing1x};
  line-height: 2rem;
`;

const AppBannerBox = styled.div`
  text-align: center;
`;

const AboutPage: React.FC<Props> = ({ data }) => {
  const title = `百人一首 - サイトについて -`;
  const onClickBack = () => {
    navigate(ROUTE_PATHS.ROOT, { replace: true });
  };

  return (
    <ErrorBoundary>
      <Layout
        title={title}
        canBack={true}
        isDisplayNav={true}
        currentMenuType={MenuType.Other}
        onClickBack={onClickBack}
      >
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={data.site.siteMetadata.description}
        />
        <Container>
          <Section>
            <SectionTitle>サイトについて</SectionTitle>
            <SectionText>
              このサイトは百人一首を覚えるためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
            </SectionText>
          </Section>
          <AdTop />
          <Section>
            <SectionTitle>使い方について</SectionTitle>
            <SectionText>
              練習では様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
              もう全部覚えたという方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。
              資料では百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
            </SectionText>
          </Section>
          <AdResponsive />
          <Section>
            <SectionTitle>アプリ版について</SectionTitle>
            <SectionText>
              Androidのみリリースしています。こちらは一旦インストールしていただけばオフラインでも使えます。iOS版は未定ですが、要望があればがんばります。
            </SectionText>
            <AppBannerBox>
              <a href="https://play.google.com/store/apps/details?id=me.rei_m.hyakuninisshu&hl=ja&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                <img
                  alt="Google Play で手に入れよう"
                  src="https://play.google.com/intl/en_us/badges/images/generic/ja_badge_web_generic.png"
                  style={{
                    margin: 'auto',
                    width: 200,
                  }}
                />
              </a>
            </AppBannerBox>
          </Section>
          <Section>
            <SectionTitle>運営者について</SectionTitle>
            <SectionText>
              当サイトは
              <a href="https://twitter.com/rei_m" target="_blank">
                @rei_m
              </a>
              が個人で運営しています。不具合や要望等あればTwitterまでご連絡ください。
              アプリのレビューで読み上げ機能が欲しいというお声をいただくのですが、使用可能ないい音源があれば搭載します。
            </SectionText>
          </Section>
          <Section>
            <SectionTitle>プライバシー ポリシー</SectionTitle>
            <SectionText>
              サイトの利用状況の把握や広告配信のためにGoogle社が提供しているサービスを利用しております。詳しくは
              <a href="https://rei-m.github.io/app/policy/" target="_blank">
                こちら
              </a>
              から確認ください。
            </SectionText>
          </Section>
        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default AboutPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
  }
`;
