import * as React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import ExamResultView from '@src/components/ExamResultView';
import ErrorMessage from '@src/components/ErrorMessage';
import { GlobalState } from '@src/state';
import { QuestionState } from '@src/enums';
import { Answer, Question } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';

export interface ConnectedProps {
  questions: Question[];
  answers: Answer[];
  totalCount: number;
  questionState?: QuestionState;
}

export type Props = ConnectedProps;

export const ExamResult: React.FC<Props> = ({ questions, answers, totalCount, questionState }) => {
  if (questionState !== QuestionState.Finished) {
    return <ErrorMessage text="不正な遷移を行いました。前の画面からやり直してください。" />;
  }
  const averageAnswerSecond = answers.reduce((prev, current) => prev + current.time, 0) / 1000 / totalCount;

  const onClickRestartHandler = () => {
    navigate(ROUTE_PATHS.TRAINING_QUESTION, {
      state: {
        submitTime: new Date().getTime(),
        restart: true,
      },
    });
  };

  return (
    <ExamResultView
      averageAnswerSecond={Math.round(averageAnswerSecond * 100) / 100}
      totalCount={totalCount}
      correctCount={answers.filter(a => a.correct).length}
      answers={answers}
      questions={questions}
      onClickRestart={onClickRestartHandler}
    />
  );
};

export const mapStateToProps = ({ questions }: GlobalState): ConnectedProps => {
  const { answers, questionState } = questions;
  return {
    questions: questions.questions,
    answers,
    totalCount: questions.questions.length,
    questionState,
  };
};

export default connect(mapStateToProps)(ExamResult);
