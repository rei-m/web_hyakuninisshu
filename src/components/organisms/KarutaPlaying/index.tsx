import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Img from 'gatsby-image';
import Block from '@src/components/atoms/Block';
import Ratio from '@src/components/atoms/Ratio';
import YomiFuda from '@src/components/molecules/YomiFuda';
import ToriFuda from '@src/components/molecules/ToriFuda';
import { useCorrectImage } from '@src/hooks/staticQueries/useCorrectImage';
import { Answer, Question, ToriFuda as ToriFudaType } from '@src/types';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  question: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  duration: number;
  onClickToriFuda: (toriFuda: ToriFudaType) => void;
  onClickResult: () => void;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  yomiFudaContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: theme.spacing(3),
    width: 312,
  },
  toriFudaContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  yomiFuda: {
    boxShadow: theme.elevationShadow1x,
  },
  toriFuda: {
    margin: theme.spacing(1),
    boxShadow: theme.elevationShadow1x,
  },
  position: {
    color: '#fff !important',
    borderBottom: '1px dotted #fff',
    position: 'absolute',
    right: 0,
    top: -32,
  },
  correctImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
  },
  correctImage: {
    width: 300,
    height: 300,
  },
}));

const KarutaPlaying = ({
  answer,
  currentPosition,
  question,
  totalCount,
  duration,
  onClickToriFuda,
  onClickResult,
}: Props) => {
  const classes = useStyles();
  return (
    <Block className={classes.root}>
      <Block className={classes.yomiFudaContainer}>
        <Ratio denominator={totalCount} numerator={currentPosition} size={`s`} className={classes.position} />
        <YomiFuda yomiFuda={question.yomiFuda} answered={!!answer} duration={duration} className={classes.yomiFuda} />
      </Block>
      <Block className={classes.toriFudaContainer}>
        {question.toriFudas.map(toriFuda => (
          <ToriFuda
            key={toriFuda.karutaNo}
            toriFuda={toriFuda}
            thin={!!answer && answer.karutaNo !== toriFuda.karutaNo}
            onClick={onClickToriFuda}
            className={classes.toriFuda}
            data-test={`torifuda-${toriFuda.karutaNo}`}
          />
        ))}
      </Block>
      {answer && (
        <Block onClick={onClickResult} className={classes.correctImageContainer} data-test="result">
          <Img
            fluid={useCorrectImage().find((_, i) => (i === 0 && answer.correct) || (i === 1 && !answer.correct))}
            className={classes.correctImage}
          />
        </Block>
      )}
    </Block>
  );
};

export default KarutaPlaying;
