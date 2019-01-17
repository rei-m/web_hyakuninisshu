import * as React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import { withState } from 'recompose';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import QuestionResultsSummary from '@src/components/QuestionResultsSummary';
import QuestionResultsMap from '@src/components/QuestionResultsMap';
import KarutaCardDialog from '@src/components/KarutaCardDialog';
import AppButton from '@src/components/AppButton';
import TweetButton from '@src/components/TweetButton';
import { Answer, Karuta, Question } from '@src/types';

export interface Props {
  totalCount: number;
  correctCount: number;
  averageAnswerSecond: number;
  questions: Question[];
  answers: Answer[];
  onClickRestart: () => void;
}

export interface QueryData {
  examBGImage: {
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

const ShareButtonsWrapper = styled.div`
  text-align: center;
`;

const enhance = withState<{}, Karuta | undefined, 'displayedKaruta', 'setDisplayedKaruta'>(
  'displayedKaruta',
  'setDisplayedKaruta',
  undefined
);

const onClickBack = () => {
  navigate('/exam', { replace: true });
};

const ExamResult = enhance<
  Props & {
    displayedKaruta: Karuta | undefined;
    setDisplayedKaruta: (karuta?: Karuta) => Karuta | undefined;
  }
>(
  ({
    averageAnswerSecond,
    correctCount,
    totalCount,
    questions,
    answers,
    onClickRestart,
    displayedKaruta,
    setDisplayedKaruta,
  }) => {
    const onClickResultsMap = (karuta: Karuta) => {
      setDisplayedKaruta(karuta);
    };

    const onCloseDialog = () => {
      setDisplayedKaruta(undefined);
    };

    return (
      <StaticQuery
        query={query}
        render={({ examBGImage }: QueryData) => (
          <Container bgImageUrl={examBGImage.publicURL}>
            <Inner>
              <QuestionResultsSummary
                title="正解数"
                value={`${correctCount} / ${totalCount}`}
                style={{ marginBottom: appTheme.spacing2x }}
              />
              <QuestionResultsSummary
                title="平均回答時間"
                value={`${averageAnswerSecond}秒`}
                style={{ marginBottom: appTheme.spacing4x }}
              />
              <ShareButtonsWrapper>
                <TweetButton text={`百人一首で ${totalCount}問中 ${correctCount}問 正解しました！`} />
              </ShareButtonsWrapper>
              <QuestionResultsMap
                questions={questions}
                answers={answers}
                onClickResult={onClickResultsMap}
                style={{ marginBottom: appTheme.spacing2x }}
              />
              {correctCount !== totalCount && (
                <AppButton
                  label="間違えた歌の練習をする"
                  icon="refresh"
                  type="normal"
                  onClick={onClickRestart}
                  data-test="restart-training"
                  style={{ margin: appTheme.spacing2x }}
                />
              )}
              <AppButton
                label="メニューに戻る"
                icon="arrow_back"
                type="normal"
                onClick={onClickBack}
                data-test="back"
              />
            </Inner>
            <KarutaCardDialog open={!!displayedKaruta} onClose={onCloseDialog} karuta={displayedKaruta} />
          </Container>
        )}
      />
    );
  }
);

export default ExamResult;

const query = graphql`
  query {
    examBGImage: file(relativePath: { eq: "tatami_part.png" }) {
      publicURL
    }
  }
`;
