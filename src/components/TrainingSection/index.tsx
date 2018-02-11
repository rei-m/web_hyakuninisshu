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
  justify-content: center;
  flex-direction: row-reverse;
`;

const TrainingSection = ({ question }: TrainingSectionProps) => {
  return (
    <section>
      <YomiFudaView
        yomiFuda={question.yomiFuda}
        style={{ margin: '24px auto' }}
      />
      <ToriFudaBox>
        {question.toriFudas.map((toriFuda, i) => (
          <ToriFudaView toriFuda={toriFuda} style={{ margin: '8px' }} key={i} />
        ))}
      </ToriFudaBox>
    </section>
  );
};

export default TrainingSection;
