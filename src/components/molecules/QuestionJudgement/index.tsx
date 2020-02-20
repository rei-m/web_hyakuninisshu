import React, { useCallback } from 'react';
import clsx from 'clsx';
import Img from 'gatsby-image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import KarutaNo from '@src/components/atoms/KarutaNo';
import { useCorrectImage } from '@src/hooks/staticQueries/useCorrectImage';
import { Karuta } from '@src/types';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  karuta: Karuta;
  correct: boolean;
  className?: string;
  onClick?: (karuta: Karuta) => void;
};

const useStyles = makeStyles<ThemeInterface>(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imageBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

const QuestionJudgement = ({ karuta, correct, className, onClick }: Props) => {
  const [correctImage, incorrectImage] = useCorrectImage();
  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick(karuta);
    }
  }, []);

  const classes = useStyles();
  return (
    <Block onClick={handleOnClick} className={clsx(classes.root, className)}>
      <KarutaNo karutaNo={karuta.no} size={`ss`} />
      <Block className={classes.imageBox}>
        <Img fluid={correct ? correctImage : incorrectImage} style={{ width: '80%' }} />
      </Block>
    </Block>
  );
};

export default React.memo(
  QuestionJudgement,
  (prevProps, nextProps) => prevProps.karuta.no === nextProps.karuta.no && prevProps.correct === nextProps.correct
);
