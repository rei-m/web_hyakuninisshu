import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import PageTitle from '@src/components/PageTitle';
import AdTop from '@src/components/AdTop';
import AdResponsive from '@src/components/AdResponsive';
import KarutaList from '@src/components/KarutaList';
import { Karuta } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';
import { MenuType } from '@src/enums';

export interface Props {
  data: {
    allKaruta: {
      edges: Array<{
        node: {
          internal: {
            content: string;
          };
        };
      }>;
    };
  };
}

const Container = styled.section`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing2x};
`;

const KarutasPage: React.FC<Props> = ({ data }) => {
  const karutas = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  const title = `百人一首 - 資料 -`;
  const description = `百人一首の資料のページです。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`;
  const onClickKarutaListRow = (karutaNo: number) =>
    navigate(ROUTE_PATHS.KARUTAS_ID.replace(':id', karutaNo.toString()));
  const onClickBack = () => navigate(ROUTE_PATHS.ROOT, { replace: true });

  return (
    <ErrorBoundary>
      <Layout
        title={title}
        canBack={true}
        isDisplayNav={true}
        currentMenuType={MenuType.Material}
        onClickBack={onClickBack}
      >
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={description}
        />
        <Container>
          <PageTitle title="歌一覧" />
          <AdTop />
          <KarutaList karutas={karutas} onClickRow={onClickKarutaListRow} />
          <AdResponsive />
        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default KarutasPage;

export const query = graphql`
  query {
    allKaruta(sort: { fields: [no], order: ASC }) {
      edges {
        node {
          internal {
            content
          }
        }
      }
    }
  }
`;
