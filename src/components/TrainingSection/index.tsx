import * as React from 'react';
import styled from 'styled-components';
import { Question } from '../../types';
import YomiFudaView from '../YomiFudaView';
import ToriFudaView from '../ToriFudaView';

export interface TrainingSectionProps {
  question: Question;
}

const ToriFudaBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const TrainingSection = ({ question }: TrainingSectionProps) => {
  return (
    <section>
      <YomiFudaView yomiFuda={question.yomiFuda} />
      <ToriFudaBox>
        {question.toriFudas.map((toriFuda, i) => (
          <ToriFudaView toriFuda={toriFuda} key={i} />
        ))}
      </ToriFudaBox>
    </section>
  );
};

export default TrainingSection;
