import React from 'react';
import clsx from 'clsx';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type MenuType = 'training' | 'exam' | 'material' | 'other';

export type Props = {
  menuType: MenuType;
  active?: boolean;
  className?: string;
  renderIcon: (menuType: MenuType) => React.ReactElement<SvgIconProps>;
  onClick?: () => void;
};

const MENU_TYPE_MAP = {
  training: '練習',
  exam: '腕試し',
  material: '資料',
  other: 'その他',
} as const;

const useStyles = makeStyles<ThemeInterface, Pick<Props, 'active' | 'menuType'>>(theme => ({
  root: {
    height: 56,
    color: theme.palette.common.white,
    position: 'relative',
    boxSizing: 'border-box',
    width: 'inherit',
    opacity: ({ active }) => (active ? 1 : 0.8),
    '& svg': {
      marginBottom: '18px',
    },
    '&:after': {
      content: ({ menuType }) => `'${MENU_TYPE_MAP[menuType]}'`,
      bottom: theme.spacing(1),
      position: 'absolute',
      fontSize: theme.fontSize.ss,
      opacity: 1,
    },
  },
}));

const NavigationItem = ({ menuType, active, className = '', renderIcon, onClick }: Props) => (
  <CenteredFrame className={clsx(useStyles({ active, menuType }).root, className)} onClick={onClick}>
    {renderIcon(menuType)}
  </CenteredFrame>
);

export default NavigationItem;
