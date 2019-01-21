import * as React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import styled from '@src/styles/styled-components';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import AdTop from '@src/components/AdTop';
import AdResponsive from '@src/components/AdResponsive';
import TrainingResult from '@src/containers/TrainingResult';
import { MenuType } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';

export interface QueryData {
  trainingResultBGImage: {
    publicURL: string;
  };
}

const Container = styled.div<{ bgImageUrl: string }>`
  padding: ${({ theme }) => theme.spacing2x} 0;
  width: 100vw;
  background-image: url("${({ bgImageUrl }) => bgImageUrl}");
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const TrainingResultPage: React.FC<{}> = () => {
  const title = `百人一首 - 練習結果 -`;
  const description =
    '百人一首の暗記を練習できます。出題条件を組み合わせて自分にあったペースで練習できます。百人一首の歌の意味に触れながら楽しく覚えましょう。';
  const onClickBack = () => {
    navigate(ROUTE_PATHS.TRAINING, { replace: true });
  };

  return (
    <ErrorBoundary>
      <Layout title={title} isDisplayNav={false} currentMenuType={MenuType.Training} onClickBack={onClickBack}>
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={description}
        />
        <StaticQuery
          query={query}
          render={({ trainingResultBGImage }: QueryData) => (
            <Container bgImageUrl={trainingResultBGImage.publicURL}>
              <AdTop />
              <TrainingResult />
              <AdResponsive />
            </Container>
          )}
        />
      </Layout>
    </ErrorBoundary>
  );
};

export default TrainingResultPage;

const query = graphql`
  query {
    trainingResultBGImage: file(relativePath: { eq: "tatami_part.png" }) {
      publicURL
    }
  }
`;
