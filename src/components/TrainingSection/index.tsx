import * as React from 'react';
import { Question } from '../../types';

export interface TrainingSectionProps {
  question: Question;
}

const TrainingSection = (props: TrainingSectionProps) => {
  return <div>{props.question.yomifuda.firstText}</div>;
};

export default TrainingSection;
