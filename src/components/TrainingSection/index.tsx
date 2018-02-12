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
    <section>
      <YomiFudaView
        yomiFuda={question.yomiFuda}
        style={{ margin: '24px auto' }}
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
    </section>
  );
};

export default TrainingSection;
