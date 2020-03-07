import React from 'react';
import clsx from 'clsx';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';

export type Props = {
  className?: string;
  renderIcon: () => React.ReactElement<SvgIconProps>;
  onClick?: () => void;
};

const useStyles = makeStyles({
  root: {
    height: 56,
    width: 56,
    color: '#fff',
    position: 'relative',
    boxSizing: 'border-box',
  },
});

const HeaderItem = ({ className = '', renderIcon, onClick }: Props) => {
  const classes = useStyles();
  return (
    <CenteredFrame onClick={onClick} className={clsx(classes.root, className)}>
      {renderIcon()}
    </CenteredFrame>
  );
};

export default HeaderItem;
