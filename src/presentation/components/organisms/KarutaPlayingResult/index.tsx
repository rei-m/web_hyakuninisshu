import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ChihayaComa from '@src/presentation/components/organisms/Alu/ChihayaComa';
import { ArrowBackButton, RefreshButton } from '@src/presentation/components/molecules/IconLabelButton';
import TweetLinkButton from '@src/presentation/components/molecules/TweetLinkButton';
import Block from '@src/presentation/components/atoms/Block';
import Txt from '@src/presentation/components/atoms/Txt';
import Ratio from '@src/presentation/components/atoms/Ratio';
import Second from '@src/presentation/components/atoms/Second';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  correctCount: number;
  totalCount: number;
  averageAnswerSecond: number;
  onClickBack: () => void;
  onClickRestart: () => void;
};

const useStyles = makeStyles<ThemeInterface>((theme) => ({
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

export const KarutaPlayingResult: React.FC<Props> = ({
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
      {children && children}
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

export default KarutaPlayingResult;
