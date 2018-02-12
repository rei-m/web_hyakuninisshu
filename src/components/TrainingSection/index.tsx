import * as React from 'react';
import styled from 'styled-components';
import { Answer, Question, ToriFuda } from '../../types';
import YomiFudaView from '../YomiFudaView';
import ToriFudaView from '../ToriFudaView';
import QuestionResult from '../QuestionResult';

export interface TrainingSectionOwnProps {
  question: Question;
  answer?: Answer;
}

export interface TrainingSectionDispatchProps {
  onClickToriFuda: (toriFuda: ToriFuda) => void;
  onClickResult: () => void;
}

export type TrainingSectionProps = TrainingSectionOwnProps &
  TrainingSectionDispatchProps;

const Frame = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ToriFudaBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;

const TrainingSection = ({
  answer,
  question,
  onClickToriFuda,
  onClickResult
}: TrainingSectionProps) => {
  return (
    <Frame>
      <YomiFudaView
        yomiFuda={question.yomiFuda}
        style={{ margin: '0 auto 24px auto' }}
      />
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

export default TrainingSection;
