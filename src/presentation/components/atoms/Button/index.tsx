import React from 'react';
import MuiButton from '@material-ui/core/Button';

export type Props = {
  type?: 'accent' | 'default';
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, type = 'default', className = '', onClick }) => (
  <MuiButton color={type === 'accent' ? 'secondary' : 'default'} onClick={onClick} className={className}>
    {children}
  </MuiButton>
);

export default Button;
