import * as React from 'react';
import styled from '@src/styles/styled-components';
import Header from '@src/components/Header';
import Navigation from '@src/components/Navigation';
import { MenuType } from '@src/enums';

export interface Props {
  title: string;
  currentMenuType?: MenuType;
  isDisplayNav: boolean;
  onClickBack?: () => void;
  onClickSearch?: () => void;
}

type BodyProps = Pick<Props, 'isDisplayNav'>;

export const Body = styled.div<BodyProps>`
  padding-top: ${({ theme }) => theme.headerHeight};
  padding-bottom: ${({ isDisplayNav, theme }) => (isDisplayNav ? theme.bottomNavHeight : '0')};
  text-align: center;
  min-height: 100vh;

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    padding-top: ${({ theme }) => theme.headerHeightWide};
    padding-bottom: 0;
    padding-left: ${({ isDisplayNav, theme }) => (isDisplayNav ? theme.bottomNavHeight : '0')};
  }
`;

const Layout: React.FC<Props> = ({ title, children, onClickBack, onClickSearch, isDisplayNav, currentMenuType }) => (
  <>
    <Header title={title} onClickBack={onClickBack} onClickSearch={onClickSearch} />
    <Body isDisplayNav={isDisplayNav}>{children}</Body>
    {isDisplayNav && <Navigation currentMenuType={currentMenuType} />}
  </>
);

export default Layout;
