import * as React from 'react';
import { Link } from 'react-router-dom';
import { withState } from 'recompose';
import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';
import { withAppTheme } from '@src/styles';
import { Answer, Karuta, Question } from '@src/types';
import Tatami from '@src/components/Tatami';
import QuestionResultsSummary from '@src/components/QuestionResultsSummary';
import QuestionResultsMap from '@src/components/QuestionResultsMap';
import KarutaCard from '@src/components/KarutaCard';

export interface ExamResultProps {
  readonly totalCount: number;
  readonly correctCount: number;
  readonly averageAnswerSecond: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly onClickRestart: () => void;
}

const RootSection = Tatami.extend`
  width: 100vw;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const Inner = withAppTheme(styled.div)`
  max-width: 380px;
  padding: ${({ theme }) => theme.spacing2x};
  margin: auto;
`;

const Button = withAppTheme(styled.button)`
  margin: ${({ theme }) => theme.spacing2x};
`;

const enhance = withState<
  {},
  Karuta | undefined,
  'displayedKaruta',
  'setDisplayedKaruta'
>('displayedKaruta', 'setDisplayedKaruta', undefined);

const ExamResult = enhance<
  ExamResultProps & {
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
    setDisplayedKaruta
  }) => {
    const onClickResultsMap = (karuta: Karuta) => {
      setDisplayedKaruta(karuta);
    };

    const onCloseDialog = () => {
      setDisplayedKaruta(undefined);
    };

    return (
      <RootSection>
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
            <Button
              onClick={onClickRestart}
              className="bp3-button bp3-large bp3-icon-repeat"
              data-test="restart-training"
            >
              間違えた歌の練習をする
            </Button>
          )}
          <Link to="/exam" replace={true}>
            <Button
              className="bp3-button bp3-large bp3-icon-undo"
              style={{ marginTop: 0 }}
            >
              メニューに戻る
            </Button>
          </Link>
        </Inner>
        <Dialog
          isOpen={!!displayedKaruta}
          onClose={onCloseDialog}
          title="正解"
          style={{
            maxWidth: 380,
            padding: 0,
            width: '80vw'
          }}
        >
          {displayedKaruta && <KarutaCard karuta={displayedKaruta} />}
        </Dialog>
      </RootSection>
    );
  }
);

export default ExamResult;
