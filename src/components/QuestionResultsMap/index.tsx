import * as React from 'react';
import styled from 'styled-components';
import { Answer, Question } from '../../types';
import { convetKarutaId } from '../helper';
import * as correctImage from './check_correct.png';
import * as incorrectImage from './check_incorrect.png';

export interface QuestionResultsMapProps {
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly style?: React.CSSProperties;
  readonly onClickResult: (karutaId: number) => void;
}

export interface QuestionResultsCellProps {
  question: Question;
  answer: Answer;
  onClickResult: (karutaId: number) => void;
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Cell = styled.div`
  width: 20%;
  height: 69px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KarutaNo = styled.span`
  font-size: 1.2rem;
`;

const CorrentImageBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const QuestionResultsCell = ({
  question,
  answer,
  onClickResult
}: QuestionResultsCellProps) => {
  const onClickCell = () => {
    onClickResult(question.correctKaruta.id);
  };
  return (
    <Cell onClick={onClickCell}>
      <KarutaNo>{convetKarutaId(question.correctKaruta.id)}</KarutaNo>
      <CorrentImageBox>
        <img
          src={answer.correct ? correctImage : incorrectImage}
          style={{ width: '80%' }}
        />
      </CorrentImageBox>
    </Cell>
  );
};

const QuestionResultsMap = ({
  questions,
  answers,
  style,
  onClickResult
}: QuestionResultsMapProps) => (
  <Root style={style}>
    {questions.map((q, i) => (
      <QuestionResultsCell
        question={q}
        answer={answers[i]}
        onClickResult={onClickResult}
        key={i}
      />
    ))}
  </Root>
);

export default QuestionResultsMap;
