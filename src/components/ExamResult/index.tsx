import { appTheme } from '@src/styles/theme';
import * as React from 'react';
import { withState } from 'recompose';
import { Dialog } from '@blueprintjs/core';
import styled from '@src/styles/styled-components';
import { graphql, navigate, StaticQuery } from 'gatsby';
import QuestionResultsSummary from '@src/components/QuestionResultsSummary';
import QuestionResultsMap from '@src/components/QuestionResultsMap';
import KarutaCard from '@src/components/KarutaCard';
import AppButton from '../AppButton';
import { Answer, Karuta, Question } from '@src/types';

export interface Props {
  totalCount: number;
  correctCount: number;
  averageAnswerSecond: number;
  questions: Question[];
  answers: Answer[];
  onClickRestart: () => void;
}

interface QueryData {
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
                title={'正解数'}
                value={`${correctCount} / ${totalCount}`}
                style={{ marginBottom: 16 }}
              />
              <QuestionResultsSummary
                title={'平均回答時間'}
                value={`${averageAnswerSecond}秒`}
                style={{ marginBottom: 16 }}
              />
              <QuestionResultsMap
                questions={questions}
                answers={answers}
                onClickResult={onClickResultsMap}
                style={{ marginBottom: 16 }}
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
              <AppButton
                label="メニューに戻る"
                icon="arrow_back"
                type="normal"
                onClick={onClickBack}
                data-test="back"
              />
            </Inner>
            <Dialog
              isOpen={!!displayedKaruta}
              onClose={onCloseDialog}
              title="正解"
              style={{
                maxWidth: 380,
                padding: 0,
                width: '80vw',
              }}
            >
              {displayedKaruta && <KarutaCard karuta={displayedKaruta} />}
            </Dialog>
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
