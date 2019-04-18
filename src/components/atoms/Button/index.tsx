import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import MuiButton from '@material-ui/core/Button';
import { appTheme } from '@src/styles/theme';

export interface Props {
  type?: 'primary' | 'normal';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const styles = (_theme: Theme) => ({
  button: {
    padding: '5px 15px',
    fontSize: appTheme.fontSizeM,
  },
  normal: {
    color: '#182026',
    backgroundColor: '#f5f8fa',
    '&:active': {
      backgroundColor: appTheme.colorAccentActive,
    },
    '&:hover': {
      backgroundColor: '#ebf1f5',
    },
  },
  primary: {
    color: '#ffffff',
    backgroundColor: appTheme.colorAccent,
    '&:active': {
      backgroundColor: appTheme.colorAccentActive,
    },
    '&:hover': {
      backgroundColor: appTheme.colorAccentHover,
    },
  },
});

type RenderProps = Props & {
  classes: {
    button: string;
    normal: string;
    primary: string;
  };
};

const StyledButton: React.FC<RenderProps> = ({ children, type = 'normal', style, classes, className, onClick }) => (
  <MuiButton
    variant={`outlined`}
    onClick={onClick}
    className={`${className} ${classes.button} ${classes[type]}`}
    style={style}
  >
    {children}
  </MuiButton>
);

const ButtonComponent = withStyles(styles)(StyledButton);

const Button: React.FC<Props> = props => <ButtonComponent {...props} />;

export default Button;
