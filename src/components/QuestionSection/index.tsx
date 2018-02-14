import * as React from 'react';
import styled from 'styled-components';
import { Answer, Question, ToriFuda } from '../../types';
import YomiFudaView from '../YomiFudaView';
import ToriFudaView from '../ToriFudaView';
import QuestionResult from '../QuestionResult';

export interface QuestionSectionOwnProps {
  question: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
}

export interface QuestionSectionDispatchProps {
  onClickToriFuda: (toriFuda: ToriFuda) => void;
  onClickResult: () => void;
}

export type QuestionSectionProps = QuestionSectionOwnProps &
  QuestionSectionDispatchProps;

const Frame = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const YomiFudaBox = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 312px;
`;

const ToriFudaBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;

const Position = styled.div`
  position: absolute;
  right: 0;
  top: -32px;
`;

const QuestionSection = ({
  answer,
  currentPosition,
  question,
  totalCount,
  onClickToriFuda,
  onClickResult
}: QuestionSectionProps) => {
  return (
    <Frame>
      <YomiFudaBox>
        <Position>
          {currentPosition} / {totalCount}
        </Position>
        <YomiFudaView yomiFuda={question.yomiFuda} style={{ margin: 'auto' }} />
      </YomiFudaBox>
      <ToriFudaBox>
        {question.toriFudas.map((toriFuda, i) => (
          <ToriFudaView
            toriFuda={toriFuda}
            style={{ margin: '8px' }}
            key={i}
            onClick={onClickToriFuda}
          />
        ))}
      </ToriFudaBox>
      {answer && <QuestionResult answer={answer} onClick={onClickResult} />}
    </Frame>
  );
};

export default QuestionSection;
