import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from '@src/styles/styled-components';
import { useReactPortal } from '@src/hooks/useReactPortal';

export interface Props {
  onClick?: () => void;
}

const Container = styled.div({
  width: '100%',
  height: '100%',
  overflow: 'scroll',
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const Overlay: React.FC<Props> = ({ children, onClick }) => {
  const el = useReactPortal();

  const handleOnClick = React.useCallback((e: React.SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  }, []);

  return ReactDOM.createPortal(<Container onClick={handleOnClick}>{children}</Container>, el);
};

export default Overlay;
