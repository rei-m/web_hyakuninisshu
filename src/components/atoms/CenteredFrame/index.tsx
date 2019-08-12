import React from 'react';
import { ThemedStyledFunction } from 'styled-components';
import styled from '@src/styles/styled-components';
import { ThemeInterface } from '@src/styles/theme';

export interface Props {
  tag?: React.ElementType;
  className?: string;
  onClick?: () => void;
}

const CenteredFrame: React.FC<Props> = ({ tag = 'span', className = '', onClick, children }) => {
  const Tag = React.useMemo(() => {
    const creator: ThemedStyledFunction<React.ElementType<any>, ThemeInterface> = styled(tag);
    return creator(props => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: props.onClick ? 'pointer' : '',
    }));
  }, []);

  return (
    <Tag className={className} onClick={onClick}>
      {children}
    </Tag>
  );
};

export default CenteredFrame;
