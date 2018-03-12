import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { Link } from 'react-router-dom';
import NavIcon from '../NavIcon';
import { MenuType } from '../../enums';
import { ROUTE_PATHS } from '../../constants';

export interface NavigationProps {
  readonly currentMenuType?: MenuType;
}

const Root = withAppTheme(styled.nav)`
  display: flex;
  position: fixed;
  height: ${({ theme }) => theme.bottomNavHeight};
  width: 100vw;
  bottom: 0;
  background-color: ${({ theme }) => theme.colorPrimary};
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.26);
  box-sizing: border-box;

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    height: 100vh;
    width: ${({ theme }) => theme.sideNavWidth};
    padding-top: ${({ theme }) => theme.headerHeightWide};
    flex-direction: column;
  }
`;

const IconBox = styled.span`
  flex-grow: 1;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-grow: 0;
    height: ${({ theme }) => theme.sideNavWidth};
  }
`;

const Navigation: React.SFC<NavigationProps> = ({ currentMenuType }) => (
  <Root>
    <IconBox>
      <Link to={ROUTE_PATHS.TRAINING} style={{ width: '100%' }}>
        <NavIcon
          iconType={MenuType.Training}
          text="練習"
          isCurrent={currentMenuType === MenuType.Training}
        />
      </Link>
    </IconBox>
    <IconBox>
      <Link to={ROUTE_PATHS.EXAM} style={{ width: '100%' }}>
        <NavIcon
          iconType={MenuType.Exam}
          text="腕試し"
          isCurrent={currentMenuType === MenuType.Exam}
        />
      </Link>
    </IconBox>
    <Link to={ROUTE_PATHS.KARUTAS} style={{ width: '100%' }}>
      <IconBox>
        <NavIcon
          iconType={MenuType.Material}
          text="資料"
          isCurrent={currentMenuType === MenuType.Material}
        />
      </IconBox>
    </Link>
    <Link to={ROUTE_PATHS.ABOUT} style={{ width: '100%' }}>
      <IconBox>
        <NavIcon
          iconType={MenuType.Other}
          text="その他"
          isCurrent={currentMenuType === MenuType.Other}
        />
      </IconBox>
    </Link>
  </Root>
);

export default Navigation;
