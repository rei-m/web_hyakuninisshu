import * as React from 'react';
import MuiButton from '@material-ui/core/Button';

export interface Props {
  type?: 'accent' | 'default';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, type = 'default', style, className = '', onClick }) => (
  <MuiButton color={type === 'accent' ? 'secondary' : 'default'} onClick={onClick} className={className} style={style}>
    {children}
  </MuiButton>
);

export default Button;
