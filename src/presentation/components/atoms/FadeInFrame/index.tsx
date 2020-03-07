import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  tag?: React.ElementType;
  duration: number;
  className?: string;
  onAnimationEnd?: () => void;
};

const useStyles = makeStyles<ThemeInterface, Pick<Props, 'duration'>>({
  root: {
    animationName: '$frameFadeIn',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,
  },
  '@keyframes frameFadeIn': {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },
});

const FadeInFrame: React.FC<Props> = ({ children, tag: Tag = 'span', duration, className = '', onAnimationEnd }) => {
  const classes = useStyles({ duration });
  return (
    <Tag
      onAnimationEnd={onAnimationEnd}
      className={clsx(classes.root, className)}
      style={{
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </Tag>
  );
};

export default FadeInFrame;
