import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import Txt from '@src/components/atoms/Txt';
import Ratio from '@src/components/atoms/Ratio';
import Second from '@src/components/atoms/Second';
import { ArrowBackButton, RefreshButton } from '@src/components/molecules/IconLabelButton';
import TweetLinkButton from '@src/components/molecules/TweetLinkButton';
import ChihayaComa from '@src/components/organisms/Alu/ChihayaComa';
import { Answer } from '@src/types';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  answers: Answer[];
  onClickBack: () => void;
  onClickRestart: () => void;
};

export type PresenterProps = Props & {
  correctCount: number;
  totalCount: number;
  averageAnswerSecond: number;
};

export type ContainerProps = Props & {
  presenter: React.FC<PresenterProps>;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    maxWidth: 380,
    padding: theme.spacing(2),
  },
  summaryContainer: {
    backgroundColor: theme.colorThin,
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    boxShadow: theme.elevationShadow1x,
    borderRadius: 4,
  },
  summaryCorrectCount: {
    marginBottom: theme.spacing(2),
  },
  summaryAverage: {
    marginBottom: theme.spacing(4),
  },
  summaryLabel: {
    textAlign: 'left',
  },
  shareButtonsWrapper: {
    textAlign: 'center',
  },
  buttonsWrapper: {
    padding: theme.spacing(1),
  },
  button: {
    boxShadow: theme.elevationShadow1x,
  },
  comaContainer: {
    backgroundColor: theme.colorThin,
    borderRadius: 4,
    padding: theme.spacing(2, 1, 1, 1),
    marginBottom: theme.spacing(2),
    boxShadow: theme.elevationShadow1x,
  },
  cheerMessageContainer: {
    marginBottom: theme.spacing(1),
  },
  cheerMessage: {
    color: 'rgb(60, 62, 61)',
  },
}));

export const KarutaPlayingResultPresenter: React.FC<PresenterProps> = ({
  children,
  correctCount,
  totalCount,
  averageAnswerSecond,
  onClickRestart,
  onClickBack,
}) => {
  const classes = useStyles();
  return (
    <Block className={classes.root}>
      <Block className={clsx(classes.summaryContainer, classes.summaryCorrectCount)}>
        <Txt tag={`div`} size={`ss`} className={classes.summaryLabel}>
          正解数
        </Txt>
        <Ratio size={`l`} numerator={correctCount} denominator={totalCount} />
      </Block>
      <Block className={clsx(classes.summaryContainer, classes.summaryAverage)}>
        <Txt tag={`div`} size={`ss`} className={classes.summaryLabel}>
          平均回答時間
        </Txt>
        <Second size={`l`} value={averageAnswerSecond} />
      </Block>
      <Block className={classes.comaContainer}>
        <Block className={classes.cheerMessageContainer}>
          <Txt size="sss" className={classes.cheerMessage}>
            当サイトは百人一首とちはやふるを応援しています
          </Txt>
        </Block>
        <Block className={classes.cheerMessageContainer}>
          <a href="https://chihayafund.com/" target="_blank" rel="noopener noreferrer">
            ちはやふる基金
          </a>
        </Block>
        <ChihayaComa />
      </Block>
      <Block className={classes.shareButtonsWrapper}>
        <TweetLinkButton text={`百人一首で ${totalCount}問中 ${correctCount}問 正解しました！`} hashTag={`百人一首`} />
      </Block>
      {children}
      {correctCount !== totalCount && (
        <Block className={classes.buttonsWrapper}>
          <RefreshButton onClick={onClickRestart} className={classes.button} data-test={`restart-training`}>
            間違えた歌の練習をする
          </RefreshButton>
        </Block>
      )}
      <Block className={classes.buttonsWrapper}>
        <ArrowBackButton onClick={onClickBack} className={classes.button} data-test={`back`}>
          メニューに戻る
        </ArrowBackButton>
      </Block>
    </Block>
  );
};

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
    return [_correctCount, Math.round(_averageAnswerSecond * 100) / 100];
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
