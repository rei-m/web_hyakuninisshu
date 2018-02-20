import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '../MenuIcon';
import SectionTitle from '../SectionTitle';
import { MenuIconType } from '../../enums';

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MenuRoot = styled.div`
  padding: 16px;
`;

const MenuSection = () => (
  <section>
    <SectionTitle title="メニュー" />
    <MenuWrapper>
      <Link to="/training">
        <MenuRoot>
          <MenuIcon iconType={MenuIconType.Training} />
          <div>練習</div>
          <p>説明</p>
        </MenuRoot>
      </Link>
      <Link to="/exam">
        <MenuRoot>
          <MenuIcon iconType={MenuIconType.Exam} />
          <div>腕試し</div>
          <p>説明</p>
        </MenuRoot>
      </Link>
      <Link to="/karutas">
        <MenuRoot>
          <MenuIcon iconType={MenuIconType.Material} />
          <div>資料</div>
          <p>説明</p>
        </MenuRoot>
      </Link>
    </MenuWrapper>
  </section>
);

export default MenuSection;
