import React from 'react';
import styled from '@src/styles/styled-components';
import MenuLink from '@src/components/molecules/MenuLink';
import Block from '@src/components/atoms/Block';
import { ExamIcon, MaterialIcon, TrainingIcon } from '@src/components/atoms/MenuIcon';
import { ROUTE_PATHS } from '@src/constants';

const Container = styled(Block)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

const StyledMenuLink = styled(MenuLink)`
  margin: ${({ theme }) => theme.spacingByPx(2)};
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  flex-grow: 1;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    width: 224px;
    flex-grow: 0;
  }
`;

const MainMenuList = () => (
  <Container>
    <StyledMenuLink
      to={ROUTE_PATHS.TRAINING}
      icon={<TrainingIcon />}
      name={`練習`}
      description={`様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。`}
    />
    <StyledMenuLink
      to={ROUTE_PATHS.EXAM}
      icon={<ExamIcon />}
      name={`腕試し`}
      description={`自身のある方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。`}
    />
    <StyledMenuLink
      to={ROUTE_PATHS.KARUTAS}
      icon={<MaterialIcon />}
      name={`資料`}
      description={`百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。`}
    />
  </Container>
);

export default MainMenuList;
