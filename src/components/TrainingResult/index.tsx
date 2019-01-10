import * as React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import QuestionResultsSummary from '@src/components/QuestionResultsSummary';
import AppButton from '@src/components/AppButton';

export interface Props {
  totalCount: number;
  correctCount: number;
  averageAnswerSecond: number;
  onClickRestart: () => void;
}

export interface QueryData {
  trainingResultBGImage: {
    publicURL: string;
  };
}

const Container = styled.div<{ bgImageUrl: string }>`
  width: 100vw;
  background-image: url("${({ bgImageUrl }) => bgImageUrl}");
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const Inner = styled.div`
  max-width: 380px;
  padding: ${({ theme }) => theme.spacing2x};
  margin: auto;
`;

const onClickBack = () => {
  navigate('/training', { replace: true });
};

const QuestionsResult: React.FC<Props> = ({ averageAnswerSecond, correctCount, totalCount, onClickRestart }) => (
  <StaticQuery
    query={query}
    render={({ trainingResultBGImage }: QueryData) => (
      <Container bgImageUrl={trainingResultBGImage.publicURL}>
        <Inner>
          <QuestionResultsSummary
            title="正解数"
            value={`${correctCount} / ${totalCount}`}
            style={{ marginBottom: appTheme.spacing2x }}
          />
          <QuestionResultsSummary
            title="平均回答時間"
            value={`${averageAnswerSecond}秒`}
            style={{ marginBottom: appTheme.spacing2x }}
          />
          {correctCount !== totalCount && (
            <AppButton
              label="間違えた歌の練習をする"
              icon="refresh"
              type="normal"
              onClick={onClickRestart}
              data-test="restart"
              style={{ margin: appTheme.spacing2x }}
            />
          )}
          <AppButton label="メニューに戻る" icon="arrow_back" type="normal" onClick={onClickBack} data-test="back" />
        </Inner>
      </Container>
    )}
  />
);

export default QuestionsResult;

const query = graphql`
  query {
    trainingResultBGImage: file(relativePath: { eq: "tatami_part.png" }) {
      publicURL
    }
  }
`;
