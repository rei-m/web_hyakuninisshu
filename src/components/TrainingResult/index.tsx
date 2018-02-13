import * as React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

export interface TrainingResultOwnProps {
  readonly totalCount: number;
  readonly correctCount: number;
  readonly averageAnswerSecond: number;
}

export interface TrainingResultDispatchProps {
  readonly onClickRestart: () => void;
}

export type TrainingResultProps = TrainingResultOwnProps &
  TrainingResultDispatchProps;

const TrainingResult = ({
  averageAnswerSecond,
  correctCount,
  totalCount,
  onClickRestart
}: TrainingResultProps) => {
  return (
    <section>
      <div>
        <div>正解数</div>
        <div>
          {correctCount} / {totalCount}
        </div>
      </div>
      <div>
        <div>平均回答時間</div>
        <div>{averageAnswerSecond}秒</div>
      </div>
      {correctCount !== totalCount && (
        <button onClick={onClickRestart}>間違えた歌の練習</button>
      )}
      <Link to="/training" replace={true}>
        メニューに戻る
      </Link>
    </section>
  );
};

export default TrainingResult;
