import * as React from 'react';
import styled from 'styled-components';
import { Answer } from '@src/types';
import * as correctImage from './check_correct.png';
import * as incorrectImage from './check_incorrect.png';

export interface QuestionResultProps {
  readonly answer: Answer;
  readonly onClick: () => void;
}

const Frame = styled.div`
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
`;

const QuestionResult: React.SFC<QuestionResultProps> = ({
  answer,
  onClick
}) => (
  <Frame onClick={onClick}>
    {answer.correct ? (
      <Image src={correctImage} />
    ) : (
      <Image src={incorrectImage} />
    )}
  </Frame>
);

export default QuestionResult;
