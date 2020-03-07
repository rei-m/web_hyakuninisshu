import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

export type Props = {
  className?: string;
  onClick?: () => void;
};

const useStyles = makeStyles({
  clickable: {
    cursor: 'pointer',
  },
});

const Block: React.FC<Props> = ({ children, className = '', onClick }) => {
  const classes = useStyles();
  return (
    <div className={clsx(!!onClick && classes.clickable, className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Block;
