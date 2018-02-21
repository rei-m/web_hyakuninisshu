import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '../MenuIcon';
import SectionTitle from '../SectionTitle';
import { MenuType } from '../../enums';
import { ROUTE_PATHS } from '../../constants';

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
      <Link to={ROUTE_PATHS.TRAINING}>
        <MenuRoot>
          <MenuIcon iconType={MenuType.Training} />
          <div>練習</div>
          <p>説明</p>
        </MenuRoot>
      </Link>
      <Link to={ROUTE_PATHS.EXAM}>
        <MenuRoot>
          <MenuIcon iconType={MenuType.Exam} />
          <div>腕試し</div>
          <p>説明</p>
        </MenuRoot>
      </Link>
      <Link to={ROUTE_PATHS.KARUTAS}>
        <MenuRoot>
          <MenuIcon iconType={MenuType.Material} />
          <div>資料</div>
          <p>説明</p>
        </MenuRoot>
      </Link>
    </MenuWrapper>
  </section>
);

export default MenuSection;
