import * as React from 'react';
import styled from '@src/styles/styled-components';
import Header from '@src/components/organisms/Header';
import Navigation from '@src/components/organisms/Navigation';
import { MenuType } from '@src/enums';

export interface Props {
  title: string;
  currentMenuType?: MenuType;
  isDisplayNav: boolean;
  onClickBack?: () => void;
  onClickSearch?: () => void;
}

type BodyProps = Pick<Props, 'isDisplayNav'>;

export const Body = styled.main<BodyProps>`
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

const StyledHeader = styled(Header)`
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  position: fixed;
`;

const StyledNavigation = styled(Navigation)`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: ${({ theme }) => theme.bottomNavHeight};
  width: 100vw;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: column;
    height: 100vh;
    width: ${({ theme }) => theme.sideNavWidth};
    padding-top: ${({ theme }) => theme.headerHeightWide};
  }
`;

const Layout: React.FC<Props> = ({ title, children, onClickBack, onClickSearch, isDisplayNav, currentMenuType }) => (
  <>
    <StyledHeader title={title} onClickBack={onClickBack} onClickSearch={onClickSearch} />
    <Body isDisplayNav={isDisplayNav}>{children}</Body>
    {isDisplayNav && <StyledNavigation currentMenuType={currentMenuType} />}
  </>
);

export default Layout;
