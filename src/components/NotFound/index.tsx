import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';

import * as dogeza from './dogeza_businessman.png';

const Root = withAppTheme(styled.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorThin};
  flex-direction: column;
  box-sizing: border-box;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const Message = styled.div`
  font-size: 1.8rem;
`;

const DogezaImg = styled.img`
  margin-top: 32px;
  width: 200px;
`;

const NotFound = () => (
  <Root>
    <Message>
      ページが見つかりませんでした。<br />トップページにお戻りください。
    </Message>
    <DogezaImg src={dogeza} alt="ページが見つかりませでした" />
  </Root>
);

export default NotFound;
