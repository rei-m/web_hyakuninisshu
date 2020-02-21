import React from 'react';
import MuiButton from '@material-ui/core/Button';

export type Props = {
  type?: 'accent' | 'default';
  className?: string;
  style?: React.CSSProperties; // TODO: いらなそう
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, type = 'default', style, className = '', onClick }) => (
  <MuiButton color={type === 'accent' ? 'secondary' : 'default'} onClick={onClick} className={className} style={style}>
    {children}
  </MuiButton>
);

export default Button;
