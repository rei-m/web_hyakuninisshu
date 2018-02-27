import * as React from 'react';
import { Link } from 'react-router-dom';
import { withState } from 'recompose';
import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';
import QuestionResultsSummary from '../QuestionResultsSummary';
import QuestionResultsMap from '../QuestionResultsMap';
import KarutaCard from '../KarutaCard';
import { Answer, Karuta, Question } from '../../types';

export interface ExamResultProps {
  readonly totalCount: number;
  readonly correctCount: number;
  readonly averageAnswerSecond: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly onClickRestart: () => void;
}

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const Button = styled.button`
  margin: 16px;
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
        <QuestionResultsSummary
          title={'正解数'}
          value={`${correctCount} / ${totalCount}`}
          style={{
            margin: 16
          }}
        />
        <QuestionResultsSummary
          title={'平均回答時間'}
          value={`${averageAnswerSecond}秒`}
          style={{
            marginBottom: 16,
            marginLeft: 16,
            marginRight: 16
          }}
        />
        <QuestionResultsMap
          questions={questions}
          answers={answers}
          onClickResult={onClickResultsMap}
          style={{
            marginBottom: 16,
            marginLeft: 16,
            marginRight: 16
          }}
        />
        {correctCount !== totalCount && (
          <Button
            onClick={onClickRestart}
            className="pt-button pt-large pt-icon-repeat"
          >
            間違えた歌の練習をする
          </Button>
        )}
        <Link to="/exam" replace={true}>
          <Button
            className="pt-button pt-large pt-icon-undo"
            style={{ marginTop: 0 }}
          >
            メニューに戻る
          </Button>
        </Link>
        <Dialog
          isOpen={!!displayedKaruta}
          onClose={onCloseDialog}
          title="正解"
          style={{
            maxWidth: 380,
            padding: 0
          }}
        >
          {displayedKaruta && <KarutaCard karuta={displayedKaruta} />}
        </Dialog>
      </RootSection>
    );
  }
);

export default ExamResult;
