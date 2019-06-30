import * as React from 'react';
import styled from '@src/styles/styled-components';
import Layout from '@src/components/templates/Layout';
import TatamiLayout from '@src/components/molecules/TatamiLayout';
import { MenuType } from '@src/enums';

export interface Props {
  title: string;
  menuType?: MenuType;
  isDisplayNav?: boolean;
  content: React.ReactElement;
  onClickBack?: () => void;
}

const Container = styled(TatamiLayout)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacingByPx(2)};
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const PlayingPageTemplate = ({ content, title, menuType, isDisplayNav = false, onClickBack }: Props) => (
  <Layout title={title} isDisplayNav={isDisplayNav} currentMenuType={menuType} onClickBack={onClickBack}>
    <Container>{content}</Container>
  </Layout>
);

export default PlayingPageTemplate;
