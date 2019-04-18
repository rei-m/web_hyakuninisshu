import * as React from 'react';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import Txt from '@src/components/atoms/Txt';
import Ratio from '@src/components/atoms/Ratio';
import Second from '@src/components/atoms/Second';
import { ArrowBackButton, RefreshButton } from '@src/components/molecules/IconLabelButton';
import TweetLinkButton from '@src/components/molecules/TweetLinkButton';
import { Answer } from '@src/types';

export interface Props {
  answers: Answer[];
  onClickBack: () => void;
  onClickRestart: () => void;
}

export type PresenterProps = Props & {
  correctCount: number;
  totalCount: number;
  averageAnswerSecond: number;
};

export type ContainerProps = Props & {
  presenter: React.FC<PresenterProps>;
};

const Container = styled(Block)`
  max-width: 380px;
  padding: ${({ theme }) => theme.spacing2x};
`;

const SummaryContainer = styled(Block)`
  background-color: ${({ theme }) => theme.colorThin};
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing1x};
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  border-radius: 4px;
`;

const SummaryLabel = styled(Txt)`
  text-align: left;
`;

const SummaryCorrectCount = styled(SummaryContainer)`
  margin-bottom: ${({ theme }) => theme.spacing2x};
`;

const SummaryAverage = styled(SummaryContainer)`
  margin-bottom: ${({ theme }) => theme.spacing4x};
`;

const ShareButtonsWrapper = styled(Block)`
  text-align: center;
`;

const ButtonsWrapper = styled(Block)`
  padding: ${({ theme }) => theme.spacing1x};
`;

const StyledArrowBackButton = styled(ArrowBackButton)`
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
`;

const StyledRefreshButton = styled(RefreshButton)`
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
`;

export const KarutaPlayingResultPresenter: React.FC<PresenterProps> = ({
  children,
  correctCount,
  totalCount,
  averageAnswerSecond,
  onClickRestart,
  onClickBack,
}) => (
  <Container>
    <SummaryCorrectCount>
      <SummaryLabel tag={`div`} size={`ss`}>
        正解数
      </SummaryLabel>
      <Ratio size={`l`} numerator={correctCount} denominator={totalCount} />
    </SummaryCorrectCount>
    <SummaryAverage>
      <SummaryLabel tag={`div`} size={`ss`}>
        平均回答時間
      </SummaryLabel>
      <Second size={`l`} value={averageAnswerSecond} />
    </SummaryAverage>
    <ShareButtonsWrapper>
      <TweetLinkButton text={`百人一首で ${totalCount}問中 ${correctCount}問 正解しました！`} hashTag={`百人一首`} />
    </ShareButtonsWrapper>
    {children}
    {correctCount !== totalCount && (
      <ButtonsWrapper>
        <StyledRefreshButton onClick={onClickRestart} data-test={`restart-training`}>
          間違えた歌の練習をする
        </StyledRefreshButton>
      </ButtonsWrapper>
    )}
    <ButtonsWrapper>
      <StyledArrowBackButton onClick={onClickBack} data-test={`back`}>
        メニューに戻る
      </StyledArrowBackButton>
    </ButtonsWrapper>
  </Container>
);

export const KarutaPlayingResultContainer: React.FC<ContainerProps> = ({
  presenter,
  children,
  answers,
  onClickRestart,
  onClickBack,
}) => {
  const totalCount = answers.length;
  const [correctCount, averageAnswerSecond] = React.useMemo(() => {
    const _correctCount = answers.filter(a => a.correct).length;
    const _averageAnswerSecond = answers.reduce((prev, current) => prev + current.time, 0) / 1000 / totalCount;
    return [_correctCount, _averageAnswerSecond];
  }, []);

  return presenter({
    children,
    answers,
    totalCount,
    correctCount,
    averageAnswerSecond,
    onClickRestart,
    onClickBack,
  });
};

export const KarutaPlayingResult: React.FC<Props> = (props: Props) => (
  <KarutaPlayingResultContainer presenter={KarutaPlayingResultPresenter} {...props} />
);

export default KarutaPlayingResult;
