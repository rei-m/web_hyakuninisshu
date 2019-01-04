import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { appTheme } from '@src/styles/theme';

export interface Props {
  label: string;
  type: 'primary' | 'normal';
  icon?: string;
  style?: React.CSSProperties;
  onClick: () => void;
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

  return (
    <Button variant="outlined" onClick={onClick} className={buttonClassName} style={style}>
      {icon && (
        <Icon className={iconClassName} fontSize="small">
          {icon}
        </Icon>
      )}
      {label}
    </Button>
  );
});

export default AppButton;
