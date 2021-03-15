import React, { useCallback } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { GatsbyImage } from 'gatsby-plugin-image';
import YomiFuda from '@src/presentation/components/molecules/YomiFuda';
import ToriFuda from '@src/presentation/components/molecules/ToriFuda';
import Block from '@src/presentation/components/atoms/Block';
import Ratio from '@src/presentation/components/atoms/Ratio';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { useCorrectImage } from '@src/presentation/hooks/static-queries/useCorrectImage';
import { questionsTypes } from '@src/state/questions';
import { QuestionId, KarutaNo } from '@src/domain/models';

export type Props = {
  questionId: QuestionId;
  yomiFuda: questionsTypes.YomiFuda;
  toriFudaList: [questionsTypes.ToriFuda, questionsTypes.ToriFuda, questionsTypes.ToriFuda, questionsTypes.ToriFuda];
  totalCount: number;
  currentPosition: number;
  duration: number;
  answer?: {
    isCorrect: boolean;
    selectedKarutaNo: KarutaNo;
  };
  onClickToriFuda: (questionId: QuestionId, toriFuda: questionsTypes.ToriFuda) => void;
  onClickResult: () => void;
};

const useStyles = makeStyles<ThemeInterface>((theme) => ({
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
  questionId,
  yomiFuda,
  toriFudaList,
  currentPosition,
  totalCount,
  duration,
  answer,
  onClickToriFuda,
  onClickResult,
}: Props) => {
  const classes = useStyles();
  const handleClickToriFuda = useCallback(
    (toriFuda: questionsTypes.ToriFuda) => {
      onClickToriFuda(questionId, toriFuda);
    },
    [questionId]
  );
  const correctImages = useCorrectImage();
  return (
    <Block className={classes.root}>
      <Block className={classes.yomiFudaContainer}>
        <Ratio denominator={totalCount} numerator={currentPosition} size={`s`} className={classes.position} />
        <YomiFuda yomiFuda={yomiFuda} answered={!!answer} duration={duration} className={classes.yomiFuda} />
      </Block>
      <Block className={classes.toriFudaContainer}>
        {toriFudaList.map((toriFuda) => (
          <ToriFuda
            key={toriFuda.karutaNo}
            toriFuda={toriFuda}
            thin={!!answer && answer.selectedKarutaNo === toriFuda.karutaNo}
            onClick={handleClickToriFuda}
            className={classes.toriFuda}
            data-test={`torifuda-${toriFuda.karutaNo}`}
          />
        ))}
      </Block>
      {answer && (
        <Block onClick={onClickResult} className={classes.correctImageContainer} data-test="result">
          <GatsbyImage
            image={answer.isCorrect ? correctImages[0] : correctImages[1]}
            alt={answer.isCorrect ? '正解' : '不正解'}
            className={classes.correctImage}
          />
        </Block>
      )}
    </Block>
  );
};

export default KarutaPlaying;
