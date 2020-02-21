import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Props as HeadingProps } from '@src/presentation/components/atoms/Heading';

export type Props = {
  heading: React.ReactElement<HeadingProps>;
  className?: string;
  onClick?: () => void;
};

const useStyles = makeStyles({
  clickable: {
    cursor: 'pointer',
  },
});

const Article: React.FC<Props> = ({ children, heading, className = '', onClick }) => {
  const classes = useStyles();
  return (
    <article className={clsx(!!onClick && classes.clickable, className)} onClick={onClick}>
      {heading}
      {children}
    </article>
  );
};

export default Article;
