import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import TrainingResultView, { Props as TrainingResultViewProps } from '@src/components/TrainingResultView';
import ErrorMessage from '@src/components/ErrorMessage';
import { GlobalState } from '@src/state';
import { restartQuestions, QuestionsActions } from '@src/actions/questions';
import { QuestionState } from '@src/enums';
import { Answer } from '@src/types';

export interface ConnectedProps {
  answers: Answer[];
  totalCount: number;
  questionState?: QuestionState;
}

export type DispatchProps = Pick<TrainingResultViewProps, 'onClickRestart'>;

export type Props = ConnectedProps & DispatchProps;

export const TrainingResult: React.FC<Props> = ({ answers, totalCount, questionState, onClickRestart }) => {
  if (questionState !== QuestionState.Finished) {
    return <ErrorMessage text="不正な遷移を行いました。前の画面からやり直してください。" />;
  }
  const averageAnswerSecond = answers.reduce((prev, current) => prev + current.time, 0) / 1000 / totalCount;
  return (
    <TrainingResultView
      averageAnswerSecond={Math.round(averageAnswerSecond * 100) / 100}
      totalCount={totalCount}
      correctCount={answers.filter(a => a.correct).length}
      onClickRestart={onClickRestart}
    />
  );
};

export const mapStateToProps = ({ questions }: GlobalState): ConnectedProps => {
  const { answers, questionState } = questions;
  return {
    answers,
    totalCount: questions.questions.length,
    questionState,
  };
};

export const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalState, {}, QuestionsActions>): DispatchProps => ({
  onClickRestart: () => {
    dispatch(restartQuestions());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingResult);
