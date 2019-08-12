import React from 'react';
import { useSelector } from 'react-redux';
import KarutaPlayingResult from '@src/components/organisms/KarutaPlayingResult';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { Answer } from '@src/types';

export interface OwnProps {
  onClickBack: () => void;
  onClickRestart: () => void;
}

export interface ConnectedProps {
  answers: Answer[];
}

export type PresenterProps = OwnProps & ConnectedProps;

export type ContainerProps = OwnProps & { presenter: React.FC<PresenterProps> };

export const TrainingResultPresenter = ({ answers, onClickBack, onClickRestart }: PresenterProps) => (
  <KarutaPlayingResult answers={answers} onClickBack={onClickBack} onClickRestart={onClickRestart} />
);

export const TrainingResultContainer = ({ presenter, onClickBack, onClickRestart }: ContainerProps) => {
  const { answers } = useSelector<GlobalState, questionsTypes.State>(state => state.questions);
  return presenter({ answers: answers ? answers : [], onClickBack, onClickRestart });
};

export const TrainingResult = (props: OwnProps) => (
  <TrainingResultContainer {...props} presenter={TrainingResultPresenter} />
);

export default TrainingResult;
