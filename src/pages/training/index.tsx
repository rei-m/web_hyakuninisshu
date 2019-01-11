import * as React from 'react';
import { navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import TrainingMenuForm from '@src/containers/TrainingMenuForm';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import PageTitle from '@src/components/PageTitle';
import AdTop from '@src/components/AdTop';
import AdResponsive from '@src/components/AdResponsive';
import { MenuType } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';

const Container = styled.section`
  padding: ${({ theme }) => theme.spacing2x};
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  max-width: 380px;
  margin: ${({ theme }) => theme.spacing1x} auto;
`;

const TrainingPage: React.FC<{}> = () => {
  const title = `百人一首 - 練習 -`;
  const description =
    '百人一首の暗記を練習できます。出題条件を組み合わせて自分にあったペースで練習できます。百人一首の歌の意味に触れながら楽しく覚えましょう。';
  const onClickBack = () => {
    navigate(ROUTE_PATHS.ROOT, { replace: true });
  };

  return (
    <ErrorBoundary>
      <Layout title={title} isDisplayNav={true} currentMenuType={MenuType.Training} onClickBack={onClickBack}>
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={description}
        />
        <Container>
          <PageTitle title="出題設定" />
          <AdTop />
          <FormContainer>
            <TrainingMenuForm />
          </FormContainer>
          <AdResponsive />
        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default TrainingPage;
