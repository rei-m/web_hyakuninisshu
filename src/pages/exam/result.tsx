import * as React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import styled from '@src/styles/styled-components';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import AdTop from '@src/components/AdTop';
import AdResponsive from '@src/components/AdResponsive';
import ExamResult from '@src/containers/ExamResult';
import { MenuType } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';

export interface QueryData {
  examResultBGImage: {
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

const ExamResultPage: React.FC<{}> = () => {
  const title = `百人一首 - 腕試し結果 -`;
  const description = '百人一首の暗記を練習できます。百首覚えられているかチャレンジしましょう。';
  const onClickBack = () => {
    navigate(ROUTE_PATHS.EXAM, { replace: true });
  };

  return (
    <ErrorBoundary>
      <Layout title={title} isDisplayNav={false} currentMenuType={MenuType.Exam} onClickBack={onClickBack}>
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={description}
        />
        <StaticQuery
          query={query}
          render={({ examResultBGImage }: QueryData) => (
            <Container bgImageUrl={examResultBGImage.publicURL}>
              <AdTop />
              <ExamResult />
              <AdResponsive />
            </Container>
          )}
        />
      </Layout>
    </ErrorBoundary>
  );
};

export default ExamResultPage;

const query = graphql`
  query {
    examResultBGImage: file(relativePath: { eq: "tatami_part.png" }) {
      publicURL
    }
  }
`;
