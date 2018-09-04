import * as React from 'react';
import styled from 'styled-components';
import { appTheme, withAppTheme } from '@src/styles';
import Dogeza from '@src/components/Dogeza';

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

const NotFound: React.SFC = () => (
  <Root>
    <Message>
      ページが見つかりませんでした。
      <br />
      トップページにお戻りください。
    </Message>
    <Dogeza
      alt="ページが見つかりませんでした"
      style={{
        marginTop: appTheme.spacing4x
      }}
    />
  </Root>
);

export default NotFound;
