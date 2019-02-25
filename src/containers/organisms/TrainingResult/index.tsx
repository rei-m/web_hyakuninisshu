import * as React from 'react';
import { connect } from 'react-redux';
import KarutaPlayingResult from '@src/components/organisms/KarutaPlayingResult';
import { GlobalState } from '@src/state';
import { Answer } from '@src/types';

export interface OwnProps {
  onClickBack: () => void;
  onClickRestart: () => void;
}

export interface ConnectedProps {
  answers: Answer[];
}

export type Props = OwnProps & ConnectedProps;

export const TrainingResult = ({ answers, onClickBack, onClickRestart }: Props) => (
  <KarutaPlayingResult answers={answers} onClickBack={onClickBack} onClickRestart={onClickRestart} />
);

export const mapStateToProps = ({ questions }: GlobalState): ConnectedProps => ({
  answers: questions.answers ? questions.answers : [],
});

export default connect(mapStateToProps)(TrainingResult);
