import * as React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/training">
        <MenuIcon iconType={IconType.Training} />
      </Link>
      <Link to="/exam">
        <MenuIcon iconType={IconType.Exam} />
      </Link>
      <MenuIcon iconType={IconType.Material} />
    </MenuWrapper>
  </section>
);

export default MenuSection;
