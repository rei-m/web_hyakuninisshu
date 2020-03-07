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

const Section: React.FC<Props> = ({ children, heading, className = '', onClick }) => {
  const classes = useStyles();
  return (
    <section className={clsx(!!onClick && classes.clickable, className)} onClick={onClick}>
      {heading}
      {children}
    </section>
  );
};

export default Section;
