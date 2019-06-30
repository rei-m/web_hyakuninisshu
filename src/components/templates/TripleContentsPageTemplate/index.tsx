import * as React from 'react';
import styled from '@src/styles/styled-components';
import { MenuType } from '@src/enums';
import Layout from '@src/components/templates/Layout';
import Ad from '@src/components/organisms/Ad';
import SEO from '@src/components/atoms/SEO';
import Block from '@src/components/atoms/Block';

export interface Props {
  title: string;
  description?: string;
  keywords: string[];
  menuType?: MenuType;
  isDisplayNav?: boolean;
  top: React.ReactElement;
  middle: React.ReactElement;
  bottom: React.ReactElement;
  onClickBack?: () => void;
  onClickSearch?: () => void;
}

const Container = styled(Block)`
  padding: ${({ theme }) => theme.spacingByPx(2)};
  box-sizing: border-box;
  max-width: 960px;
  margin: auto;
  background-color: ${({ theme }) => theme.colorThin};
`;

const TripleContentsPageTemplate = ({
  title,
  description,
  keywords,
  menuType,
  isDisplayNav = true,
  top,
  middle,
  bottom,
  onClickBack,
  onClickSearch,
}: Props) => (
  <Layout
    title={title}
    isDisplayNav={isDisplayNav}
    currentMenuType={menuType}
    onClickBack={onClickBack}
    onClickSearch={onClickSearch}
  >
    <SEO title={title} keywords={keywords} description={description} />
    <Container>
      {top}
      <Ad type={`top`} />
      {middle}
      <Ad type={`responsive`} />
      {bottom}
    </Container>
  </Layout>
);

export default TripleContentsPageTemplate;
