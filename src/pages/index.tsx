import * as React from 'react';
import { graphql, GatsbyLinkProps, Link } from 'gatsby';
import styled from '@src/styles/styled-components';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import MenuIcon from '@src/components/MenuIcon';
import { withRipple } from '@src/enhancers/withRipple';
import { SiteMetaData } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';
import { MenuType } from '@src/enums';
import { toChineseChar } from '@src/utils';

export interface Props {
  data: {
    site: {
      siteMetadata: Pick<SiteMetaData, 'title' | 'description'>;
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

const MenuWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing4x} 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

const MenuRoot = styled.div`
  border: 1px solid #00000030;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  background-color: #fff;
  border-radius: 16px;
  box-sizing: border-box;
  flex-grow: 1;
  text-align: center;
  margin: 16px;
  & .title {
    font-size: 2rem;
    margin: 8px;
    position: relative;
    &:after {
      content: '';
      width: 100%;
      border-bottom: 4px double #a9a9a9;
      position: absolute;
      bottom: -8px;
      left: 0;
    }
  }
  & .text {
    margin-top: 24px;
  }
  & :hover {
    text-decoration: none;
    background-color: #f5f5f5;
  }
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    width: 224px;
    flex-grow: 0;
  }
`;

const KarutaList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const KarutaListItem = styled.li`
  padding: 8px;
`;

const LinkWithRipple = withRipple<GatsbyLinkProps<{}>>(Link);

const linkStyles = {
  ':hover': {
    textDecoration: 'none',
  },
  display: 'inline-block',
  height: '100%',
  padding: '16px',
};

const onClickBack = () => {
  return;
};

const IndexPage: React.FC<Props> = ({ data }) => (
  <ErrorBoundary>
    <Layout title={data.site.siteMetadata.title} canBack={false} isDisplayNav={true} onClickBack={onClickBack}>
      <SEO
        title={data.site.siteMetadata.title}
        keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
        description={data.site.siteMetadata.description}
      />
      <Container>
        <Section>
          <SectionTitle>百人一首 簡単に暗記について</SectionTitle>
          <SectionText>
            <p>
              このサイトは百人一首を手軽に暗記するためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
            </p>
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>メニュー</SectionTitle>
          <SectionText>
            <p>
              百人一首の練習は詠み札に対応する下の句を四択の中から選ぶクイズ形式となっています。繰り返し練習して百人一首のスタートに立ちましょう。
            </p>
          </SectionText>
          <MenuWrapper>
            <MenuRoot>
              <LinkWithRipple to={ROUTE_PATHS.TRAINING} style={linkStyles}>
                <MenuIcon iconType={MenuType.Training} />
                <div className="title">練習</div>
                <p className="text">
                  様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
                </p>
              </LinkWithRipple>
            </MenuRoot>
            <MenuRoot>
              <LinkWithRipple to={ROUTE_PATHS.EXAM} style={linkStyles}>
                <MenuIcon iconType={MenuType.Exam} />
                <div className="title">腕試し</div>
                <p className="text">自身のある方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。</p>
              </LinkWithRipple>
            </MenuRoot>
            <MenuRoot>
              <LinkWithRipple to={ROUTE_PATHS.KARUTAS} style={linkStyles}>
                <MenuIcon iconType={MenuType.Material} />
                <div className="title">資料</div>
                <p className="text">
                  百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
                </p>
              </LinkWithRipple>
            </MenuRoot>
          </MenuWrapper>
        </Section>
        <Section>
          <SectionTitle>百人一首とは</SectionTitle>
          <SectionText>
            <p>
              百人一首とは、100人の歌人の和歌を1人1首づつ選んだ歌集のことで、藤原定家が選んだ小倉百人一首が広く知られています。
              <br />
              現代では詠み札と取り札に別れたかるたとしての知名度が高く、散らし取り、坊主めくりなどといった遊戯や競技かるたのように札取りを競い合うスポーツもあり、幅広く親しまれています。
              百首覚えたあとは色々な遊び方を探してみてはいかがでしょうか。
            </p>
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>百人一首の用語について</SectionTitle>
          <SectionText>
            <dl>
              <dt>決まり字</dt>
              <dd>
                歌を上の句の最初から読んでいき、その文字が読まれたら、その歌が、どの一首なのかが決まるところの文字をいいます。
                <br />
                例えば「村雨の 露もまだひぬ 槇の葉に 霧たちのぼる
                秋の夕ぐれ」という歌がありますが、百首のなかで「む」で始まる歌はこの歌しかないので、この歌の決まり字は一字決まりとなります。
              </dd>
              <dt>上の句</dt>
              <dd>
                歌は五七五七七七の五つの句で構成されており、その前半の五七五の部分のこと。かるた遊びをする際は詠み札となる。
              </dd>
              <dt>下の句</dt>
              <dd>
                歌は五七五七七七の五つの句で構成されており、その後半の七七の部分のこと。かるた遊びでは取り札となる。
              </dd>
            </dl>
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>競技かるたについて</SectionTitle>
          <SectionText>
            <p>
              小倉百人一首を用いて行う競技です。百人一首というと畳の上で穏やかに遊ぶ印象がありますが、競技かるたはハードなスポーツに近いです。
              <br />
              詠み上げた上の句に対応する下の句の札を取るという基本的なルールは普通のかるた遊びと共通していますが、取った枚数を競いはしません。
              <br />
              百首のなかから50首が選ばれ、選ばれた歌の取り札が自陣と敵陣にそれぞれ分配されます。競技かるたの試合はこの自陣の札を空にすることで勝利となります。
              札は自陣の札を取ればそのまま減らし、敵陣の札を取れば敵陣の札をどけた上で自陣から敵陣に一枚札を送ります。これを送り札といいます。
              <br />
              50首を選んでいるので詠まれた札が自陣・敵陣に存在しない場合があります。これは空札といいます。取り札を間違えた場合や空札なのに取り札に触った場合はお手付きとなり、敵陣に札を送れます。
              <br />
              自陣の札を取る、または敵陣の札を取って自陣の札を敵陣に送る、という勝負を繰り返して自陣を先に空にしたほうが勝者となります。
            </p>
          </SectionText>
        </Section>
        <Section>
          <SectionTitle>歌一覧</SectionTitle>
          <KarutaList>
            {Array.from(Array(100).keys()).map(i => {
              const id = i + 1;
              return (
                <KarutaListItem key={id}>
                  <Link to={`${ROUTE_PATHS.KARUTAS}/${id}`}>{`${toChineseChar(id)}番`}</Link>
                </KarutaListItem>
              );
            })}
          </KarutaList>
        </Section>
      </Container>
    </Layout>
  </ErrorBoundary>
);

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
