import * as React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

export interface TrainingResultOwnProps {
  totalCount: number;
  correctCount: number;
}

export interface TrainingResultDispatchProps {
  onClickRestart: () => void;
}

export type TrainingResultProps = TrainingResultOwnProps &
  TrainingResultDispatchProps;

const TrainingResult = ({
  correctCount,
  totalCount,
  onClickRestart
}: TrainingResultProps) => {
  return (
    <div>
      {correctCount} / {totalCount}
      <Link to="/training" replace={true}>
        メニューに戻る
      </Link>
      {correctCount !== totalCount && (
        <button onClick={onClickRestart}>間違えた歌の練習</button>
      )}
    </div>
  );
};

export default TrainingResult;
