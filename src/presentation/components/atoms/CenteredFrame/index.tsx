import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

export type Props = {
  tag?: React.ElementType;
  className?: string;
  onClick?: () => void;
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickable: {
    cursor: 'pointer',
  },
});

const CenteredFrame: React.FC<Props> = ({ tag: Tag = 'span', className = '', onClick, children }) => {
  const classes = useStyles();
  return (
    <Tag className={clsx(classes.root, !!onClick && classes.clickable, className)} onClick={onClick}>
      {children}
    </Tag>
  );
};

export default CenteredFrame;
