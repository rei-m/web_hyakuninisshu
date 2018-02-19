import * as React from 'react';
import styled from 'styled-components';
import { COLOR_PRIMARY } from '../../constants/colors';

const Root = styled.nav`
  position: fixed;
  height: 72px;
  width: 100vw;
  bottom: 0;
  background-color: ${COLOR_PRIMARY};

  @media screen and (min-width: 768px) {
    height: 100vh;
    width: 72px;
  }
`;

const Navigation = () => {
  return <Root>hoge</Root>;
};

export default Navigation;
