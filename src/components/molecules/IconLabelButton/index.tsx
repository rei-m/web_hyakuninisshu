import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';
import { appTheme } from '@src/styles/theme';
import Button from '@src/components/atoms/Button';

// TODO これは後で移動
export const withStyle = (style: React.CSSProperties) => (component: React.ReactElement) =>
  React.cloneElement(component, { style });

export interface Props {
  type?: 'primary' | 'normal';
  iconSize?: string;
  renderIcon: () => React.ReactElement<SvgIconProps>;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const styles = {
  normal: {
    marginRight: appTheme.spacing1x,
    color: '#5c7080',
  },
  primary: {
    marginRight: appTheme.spacing1x,
  },
};

const IconLabelButton: React.FC<Props> = ({
  children,
  type = 'normal',
  iconSize = '2rem',
  renderIcon,
  className,
  style,
  onClick,
}) => (
  <Button type={type} className={className} style={style} onClick={onClick}>
    {withStyle({ ...styles[type], fontSize: iconSize })(renderIcon())}
    {children}
  </Button>
);

export const EditButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton renderIcon={() => <EditIcon />} {...props} />
);

export const ArrowForwardButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton renderIcon={() => <ArrowForwardIcon />} {...props} />
);

export const ArrowBackButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton renderIcon={() => <ArrowBackIcon />} {...props} />
);

export const RefreshButton: React.FC<Omit<Props, 'renderIcon'>> = props => (
  <IconLabelButton renderIcon={() => <RefreshIcon />} {...props} />
);

export default IconLabelButton;
