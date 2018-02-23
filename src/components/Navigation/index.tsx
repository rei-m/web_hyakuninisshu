import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavIcon from '../NavIcon';
import { COLOR_PRIMARY } from '../../constants/colors';
import { MenuType } from '../../enums';
import { ROUTE_PATHS } from '../../constants';

const Root = styled.nav`
  display: flex;
  position: fixed;
  height: 56px;
  width: 100vw;
  bottom: 0;
  background-color: ${COLOR_PRIMARY};
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.26);
  box-sizing: border-box;

  @media screen and (min-width: 768px) {
    height: 100vh;
    width: 64px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.26);
    padding-top: 72px;
    flex-direction: column;
  }
`;

const IconBox = styled.span`
  flex-grow: 1;
  width: 100%;
  @media screen and (min-width: 768px) {
    flex-grow: 0;
    height: 64px;
  }
`;

interface NavigationProps extends React.ClassAttributes<HTMLElement> {
  readonly currentMenuType?: MenuType;
}

const Navigation: React.StatelessComponent<NavigationProps> = ({
  currentMenuType
}) => {
  return (
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
};

export default Navigation;
