import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';
import { ThemeInterface } from '@src/styles/theme';
import Button from '@src/components/atoms/Button';

export interface Props {
  type?: 'accent' | 'default';
  iconSize?: string;
  renderIcon: (props: { iconSize: string }) => React.ReactElement<SvgIconProps>;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const useStyles = makeStyles<ThemeInterface, { iconSize?: string }>(theme => ({
  default: {
    marginRight: theme.spacingByPx(1),
    color: '#5c7080',
    fontSize: props => props.iconSize,
  },
  accent: {
    marginRight: theme.spacingByPx(1),
    fontSize: props => props.iconSize,
  },
}));

const IconLabelButton: React.FC<Props> = ({
  children,
  type = 'default',
  iconSize = '2rem',
  renderIcon,
  className = '',
  style,
  onClick,
}) => (
  <Button type={type} className={className} style={style} onClick={onClick}>
    {renderIcon({ iconSize })}
    {children}
  </Button>
);

export const EditButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton
    renderIcon={({ iconSize }) => <EditIcon className={useStyles({ iconSize })[props.type ? props.type : 'default']} />}
    {...props}
  />
);

export const ArrowForwardButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton
    renderIcon={({ iconSize }) => (
      <ArrowForwardIcon className={useStyles({ iconSize })[props.type ? props.type : 'default']} />
    )}
    {...props}
  />
);

export const ArrowBackButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton
    renderIcon={({ iconSize }) => (
      <ArrowBackIcon className={useStyles({ iconSize })[props.type ? props.type : 'default']} />
    )}
    {...props}
  />
);

export const RefreshButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton
    renderIcon={({ iconSize }) => (
      <RefreshIcon className={useStyles({ iconSize })[props.type ? props.type : 'default']} />
    )}
    {...props}
  />
);

export default IconLabelButton;
