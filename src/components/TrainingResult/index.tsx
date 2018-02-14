import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const ResultBox = styled.div`
  margin: 16px;
`;

const ResultTitle = styled.div`
  text-align: left;
  font-size: 1.2rem;
`;

const ResultValue = styled.div`
  font-size: 2.8rem;
`;

const Button = styled.button`
  margin: 16px;
`;

const TrainingResult = ({
  averageAnswerSecond,
  correctCount,
  totalCount,
  onClickRestart
}: TrainingResultProps) => {
  return (
    <RootSection>
      <ResultBox>
        <ResultTitle>正解数</ResultTitle>
        <ResultValue>
          {correctCount} / {totalCount}
        </ResultValue>
      </ResultBox>
      <ResultBox style={{ marginTop: 0 }}>
        <ResultTitle>平均回答時間</ResultTitle>
        <ResultValue>{averageAnswerSecond}秒</ResultValue>
      </ResultBox>
      {correctCount !== totalCount && (
        <Button
          onClick={onClickRestart}
          className="pt-button pt-large pt-icon-repeat"
        >
          間違えた歌の練習をする
        </Button>
      )}
      <Link to="/training" replace={true}>
        <Button
          className="pt-button pt-large pt-icon-undo"
          style={{ marginTop: 0 }}
        >
          メニューに戻る
        </Button>
      </Link>
    </RootSection>
  );
};

export default TrainingResult;
