import * as React from 'react';
import styled from 'styled-components';
import NavIcon from '../NavIcon';
import { COLOR_PRIMARY } from '../../constants/colors';
import { MenuType } from '../../enums';

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

const IconBox = styled.div`
  flex-grow: 1;
  width: 100%;
  @media screen and (min-width: 768px) {
    flex-grow: 0;
    height: 64px;
  }
`;

const Navigation = () => {
  return (
    <Root>
      <IconBox>
        <NavIcon iconType={MenuType.Training} text="練習" />
      </IconBox>
      <IconBox>
        <NavIcon iconType={MenuType.Exam} text="力試し" />
      </IconBox>
      <IconBox>
        <NavIcon iconType={MenuType.Material} text="資料" />
      </IconBox>
      <IconBox>
        <NavIcon iconType={MenuType.Other} text="その他" />
      </IconBox>
    </Root>
  );
};

export default Navigation;
