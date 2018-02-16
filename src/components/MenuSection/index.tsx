import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon, { IconType } from '../MenuIcon';
import SectionTitle from '../SectionTitle';

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MenuSection = () => (
  <section>
    <SectionTitle title="メニュー" />
    <MenuWrapper>
      <Link to="/training">
        <MenuIcon iconType={IconType.Training} />
      </Link>
      <Link to="/exam">
        <MenuIcon iconType={IconType.Exam} />
      </Link>
      <Link to="/karutas">
        <MenuIcon iconType={IconType.Material} />
      </Link>
    </MenuWrapper>
  </section>
);

export default MenuSection;
