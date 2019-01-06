import * as React from 'react';
import { navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import PageTitle from '@src/components/PageTitle';
import AppButton from '@src/components/AppButton';
import AdBanner from '@src/components/AdBanner';
import { MenuType } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';

const Container = styled.section`
  max-width: 380px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing2x};
  box-sizing: border-box;
`;

const Explain = styled.div`
  margin: ${({ theme }) => `${theme.spacing4x} ${theme.spacing2x}`};
`;

const onSubmit = () => {
  navigate(ROUTE_PATHS.EXAM_QUESTION, {
    state: {
      submitTime: new Date().getTime(),
    },
  });
};

const ExamPage: React.FC<{}> = () => {
  const title = `百人一首 - 腕試し -`;
  const description = '百人一首の暗記を練習できます。百首覚えられているかチャレンジしましょう。';
  const onClickBack = () => {
    navigate(ROUTE_PATHS.ROOT, { replace: true });
  };

  return (
    <ErrorBoundary>
      <Layout
        title={title}
        canBack={true}
        isDisplayNav={true}
        currentMenuType={MenuType.Exam}
        onClickBack={onClickBack}
      >
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={description}
        />
        <Container>
          <PageTitle title="腕試し" />
          <Explain>
            全百首からランダムに出題されます。
            <br />
            練習の成果を確認しましょう。
          </Explain>
          <AppButton
            label="腕試しをはじめる"
            icon="edit"
            type="primary"
            onClick={onSubmit}
            style={{ marginTop: appTheme.spacing4x, marginBottom: appTheme.spacing2x }}
          />
          <AdBanner />
        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default ExamPage;
