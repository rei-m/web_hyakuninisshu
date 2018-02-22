import * as React from 'react';
import styled from 'styled-components';

const RootSection = styled.section`
  padding: 32px 16px;
  box-sizing: border-box;
  max-width: 960px;
  margin: auto;
  text-align: left;
`;

const Article = styled.article`
  margin: 32px 0;
`;

const ArticleTitle = styled.h2`
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

const ArticleText = styled.div`
  padding: 8px;
  line-height: 2rem;
`;

const AppBannerBox = styled.div`
  text-align: center;
`;

const AboutSection = () => (
  <RootSection>
    <Article>
      <ArticleTitle>サイトについて</ArticleTitle>
      <ArticleText>
        このサイトは百人一首を覚えるためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
      </ArticleText>
    </Article>
    <Article>
      <ArticleTitle>使い方について</ArticleTitle>
      <ArticleText>
        練習では様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
        もう全部覚えたという方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。
        資料は百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
      </ArticleText>
    </Article>
    <Article>
      <ArticleTitle>アプリ版について</ArticleTitle>
      <ArticleText>
        Androidのみリリースしています。こちらは一旦インストールしていただけばオフラインでも使えます。iOS版は未定ですが、要望があればがんばります。
      </ArticleText>
      <AppBannerBox>
        <a href="https://play.google.com/store/apps/details?id=me.rei_m.hyakuninisshu&hl=ja&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
          <img
            alt="Google Play で手に入れよう"
            src="https://play.google.com/intl/en_us/badges/images/generic/ja_badge_web_generic.png"
            style={{
              margin: 'auto',
              width: 200
            }}
          />
        </a>
      </AppBannerBox>
    </Article>
    <Article>
      <ArticleTitle>運営者について</ArticleTitle>
      <ArticleText>
        当サイトは
        <a href="https://twitter.com/rei_m" target="_blank">
          @rei_m
        </a>
        が個人で運営しています。不具合や要望等あればTwitterまでご連絡ください。
        アプリのレビューで読み上げ機能が欲しいというお声をいただくのですが、使えるいい音源があれば搭載します。
      </ArticleText>
    </Article>
  </RootSection>
);

export default AboutSection;
