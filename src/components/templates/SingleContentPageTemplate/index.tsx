import * as React from 'react';
import styled from '@src/styles/styled-components';
import { MenuType } from '@src/enums';
import Layout from '@src/components/templates/Layout';
import Ad from '@src/components/organisms/Ad';
import SEO from '@src/components/atoms/SEO';
import Heading from '@src/components/atoms/Heading';

export interface Props {
  title: string;
  description?: string;
  keywords: string[];
  pageTitle: string;
  menuType?: MenuType;
  isDisplayNav?: boolean;
  content: React.ReactElement;
  onClickBack?: () => void;
  onClickSearch?: () => void;
}

const Container = styled.section`
  padding: ${({ theme }) => theme.spacing2x};
  box-sizing: border-box;
  width: 100%;
`;

const SectionTitle = styled(Heading)`
  margin: ${({ theme }) => theme.spacing1x};
`;

const SingleContentPageTemplate = ({
  content,
  title,
  description,
  keywords,
  pageTitle,
  menuType,
  isDisplayNav = true,
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
      <SectionTitle level={2}>{pageTitle}</SectionTitle>
      <Ad type={`top`} />
      {content}
      <Ad type={`responsive`} />
    </Container>
  </Layout>
);

export default SingleContentPageTemplate;
