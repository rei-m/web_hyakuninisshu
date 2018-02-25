import * as React from 'react';
import styled from 'styled-components';
import { Answer, Question, ToriFuda } from '../../types';
import Tatami from '../Tatami';
import YomiFudaView from '../YomiFudaView';
import ToriFudaView from '../ToriFudaView';
import QuestionResult from '../QuestionResult';

export interface QuestionSectionStateProps {
  question: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
}

export interface QuestionSectionDispatchProps {
  onClickToriFuda: (toriFuda: ToriFuda) => void;
  onClickResult: () => void;
}

export type QuestionSectionProps = QuestionSectionStateProps &
  QuestionSectionDispatchProps;

const Frame = Tatami.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);

  @media screen and (min-width: 768px) {
    min-height: calc(100vh - 64px);
  }
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
  color: #fff;
  border-bottom: 1px dotted #fff;
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
