import * as React from 'react';
import styled from '@src/styles/styled-components';

export interface Props {
  tag?: React.ElementType;
  className?: string;
  onClick?: () => void;
}

const CenteredFrame: React.FC<Props> = ({ tag = 'span', className, onClick, children }) => {
  const Tag = React.useMemo(
    () => styled(tag)`
      display: flex;
      justify-content: center;
      align-items: center;
      ${props => (props.onClick ? 'cursor: pointer;' : '')}
    `,
    []
  );

  return (
    <Tag className={className} onClick={onClick}>
      {children}
    </Tag>
  );
};

export default CenteredFrame;
