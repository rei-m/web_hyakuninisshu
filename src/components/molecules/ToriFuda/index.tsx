import React, { useCallback } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import VerticalTxt from '@src/components/atoms/VerticalTxt';
import { withRipple } from '@src/enhancers/withRipple';
import { ToriFuda as ToriFudaType } from '@src/types';
import { ThemeInterface, SPACING_UNIT } from '@src/styles/theme';

type Size = 's' | 'm' | 'l';

const RATIO_L = 1.15;
const RATIO_M = 1.0;
const RATIO_S = 0.875;
const ratioMap = {
  s: RATIO_S,
  m: RATIO_M,
  l: RATIO_L,
};

export type Props = {
  toriFuda: ToriFudaType;
  thin?: boolean;
  size?: Size;
  className?: string;
  onClick: (toriFuda: ToriFudaType) => void;
};

const useStyles = makeStyles<ThemeInterface, Pick<Props, 'size' | 'thin'>>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorThin,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
    borderWidth: ({ size = 'm' }) => `${3 * ratioMap[size]}px`,
    borderRadius: 10,
    height: ({ size = 'm' }) => `${220 * ratioMap[size]}px`,
    padding: theme.spacing(0, 1),
    fontFamily: '"Sawarabi Mincho"',
    cursor: 'pointer',
    opacity: ({ thin }) => (thin ? '0.8' : '1'),
  },
  inner: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  fourh: {},
  fifth: {
    paddingTop: ({ size = 'm' }) => `${SPACING_UNIT * 3 * ratioMap[size]}px`,
    marginRight: ({ size = 'm' }) => `${SPACING_UNIT * ratioMap[size]}px`,
  },
}));

const Root: React.FC<Pick<Props, 'size' | 'thin' | 'className'> & {
  children?: React.ReactNode;
  onClick: () => void;
}> = ({ size, thin, className = '', children, onClick }) => {
  const classes = useStyles({ size, thin });
  return (
    <Block onClick={onClick} className={clsx(classes.root, className)}>
      {children}
    </Block>
  );
};

const RootWithRipple = withRipple(Root);

const ToriFuda = ({ toriFuda, size = 'm', thin = false, className = '', onClick }: Props) => {
  const classes = useStyles({ size, thin });
  const handleOnClick = useCallback(() => onClick(toriFuda), []);
  return (
    <RootWithRipple size={size} thin={thin} className={className} onClick={handleOnClick}>
      <Block className={classes.inner}>
        <VerticalTxt size={size} className={classes.fourh}>
          {toriFuda.fourthText}
        </VerticalTxt>
        <VerticalTxt size={size} className={classes.fifth}>
          {toriFuda.fifthText}
        </VerticalTxt>
      </Block>
    </RootWithRipple>
  );
};

export default ToriFuda;
