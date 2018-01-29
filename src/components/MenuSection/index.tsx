import * as React from 'react';
import styled from 'styled-components';
import MenuIcon, { IconType } from '../MenuIcon';

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MenuSection = () => (
  <section>
    <h2>メニュー</h2>
    <MenuWrapper>
      <MenuIcon iconType={IconType.Training} />
      <MenuIcon iconType={IconType.Exam} />
      <MenuIcon iconType={IconType.Material} />
    </MenuWrapper>
  </section>
);

export default MenuSection;
