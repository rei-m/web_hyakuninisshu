import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import QuestionResultsSummary from '../QuestionResultsSummary';

export interface QuestionsResultProps {
  readonly totalCount: number;
  readonly correctCount: number;
  readonly averageAnswerSecond: number;
  readonly onClickRestart: () => void;
}

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const Button = styled.button`
  margin: 16px;
`;

const QuestionsResult = ({
  averageAnswerSecond,
  correctCount,
  totalCount,
  onClickRestart
}: QuestionsResultProps) => (
  <RootSection>
    <QuestionResultsSummary
      title={'正解数'}
      value={`${correctCount} / ${totalCount}`}
      style={{
        margin: 16
      }}
    />
    <QuestionResultsSummary
      title={'平均回答時間'}
      value={`${averageAnswerSecond}秒`}
      style={{
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16
      }}
    />
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

export default QuestionsResult;
