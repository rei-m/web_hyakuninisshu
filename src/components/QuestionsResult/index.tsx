import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { appTheme, withAppTheme } from '../../styles';
import Tatami from '../Tatami';
import QuestionResultsSummary from '../QuestionResultsSummary';

export interface QuestionsResultProps {
  readonly totalCount: number;
  readonly correctCount: number;
  readonly averageAnswerSecond: number;
  readonly onClickRestart: () => void;
}

const RootSection = Tatami.extend`
  width: 100vw;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const Inner = withAppTheme(styled.div)`
  max-width: 380px;
  padding: ${({ theme }) => theme.spacing2x};
  margin: auto;
`;

const Button = withAppTheme(styled.button)`
  margin: ${({ theme }) => theme.spacing2x};
`;

const QuestionsResult: React.SFC<QuestionsResultProps> = ({
  averageAnswerSecond,
  correctCount,
  totalCount,
  onClickRestart
}) => (
  <RootSection>
    <Inner>
      <QuestionResultsSummary
        title={'正解数'}
        value={`${correctCount} / ${totalCount}`}
        style={{ marginBottom: appTheme.spacing2x }}
      />
      <QuestionResultsSummary
        title={'平均回答時間'}
        value={`${averageAnswerSecond}秒`}
        style={{ marginBottom: appTheme.spacing2x }}
      />
      {correctCount !== totalCount && (
        <Button
          onClick={onClickRestart}
          className="pt-button pt-large pt-icon-repeat"
          data-test="restart"
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
    </Inner>
  </RootSection>
);

export default QuestionsResult;
