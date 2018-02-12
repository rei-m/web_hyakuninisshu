import * as React from 'react';
import styled from 'styled-components';
import { Answer } from '../../types';

export interface QuestionResultProps {
  answer: Answer;
  onClick: () => void;
}

const Frame = styled.div`
  background-color: #123;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const QuestionResult = ({ answer, onClick }: QuestionResultProps) => {
  const onClickFrame = (_: React.SyntheticEvent<HTMLDivElement>) => {
    onClick();
  };
  return (
    <Frame onClick={onClickFrame}>
      {answer.correct}
      {console.dir(answer)}
    </Frame>
  );
};

export default QuestionResult;
