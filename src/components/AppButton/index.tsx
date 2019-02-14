import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import { appTheme } from '@src/styles/theme';

export interface Props {
  label: string;
  type: 'primary' | 'normal';
  icon?: 'arrow_back' | 'refresh' | 'arrow_forward_ios' | 'edit';
  style?: React.CSSProperties;
  onClick?: () => void;
}

const styles = {
  button: {
    padding: '4px 15px',
    fontSize: '1.6rem',
    height: '40px',
  },
  normalButton: {
    color: '#182026',
    backgroundColor: '#f5f8fa',
    '&:active': {
      backgroundColor: appTheme.colorAccentActive,
    },
    '&:hover': {
      backgroundColor: '#ebf1f5',
    },
  },
  primaryButton: {
    color: '#ffffff',
    backgroundColor: appTheme.colorAccent,
    '&:active': {
      backgroundColor: appTheme.colorAccentActive,
    },
    '&:hover': {
      backgroundColor: appTheme.colorAccentHover,
    },
  },
  normalIcon: {
    marginRight: appTheme.spacing1x,
    color: '#5c7080',
  },
  primaryIcon: {
    marginRight: appTheme.spacing1x,
  },
};

const stylesProvider = () => styles;

type RenderProps = Props & {
  classes: {
    button: string;
    normalButton: string;
    primaryButton: string;
    normalIcon: string;
    primaryIcon: string;
  };
};

const Icon = ({ icon }: Pick<Props, 'icon'>) => {
  switch (icon) {
    case 'arrow_back':
      return ArrowBackIcon;
    case 'refresh':
      return RefreshIcon;
    case 'arrow_forward_ios':
      return ArrowForwardIcon;
    case 'edit':
      return EditIcon;
    default:
      return undefined;
  }
};

const AppButton = withStyles(stylesProvider)(({ label, type, icon, style, onClick, classes }: RenderProps) => {
  let buttonClassName = '';
  let iconClassName = '';
  if (type === 'primary') {
    buttonClassName = `${classes.button} ${classes.primaryButton}`;
    iconClassName = classes.primaryIcon;
  } else {
    buttonClassName = `${classes.button} ${classes.normalButton}`;
    iconClassName = classes.normalIcon;
  }
  const IconComponent = Icon({ icon });
  return (
    <Button variant="outlined" onClick={onClick} className={buttonClassName} style={style}>
      {IconComponent && <IconComponent className={iconClassName} fontSize="small" />}
      {label}
    </Button>
  );
});

export default AppButton;
