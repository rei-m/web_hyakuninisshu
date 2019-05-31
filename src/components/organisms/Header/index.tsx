import * as React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';
import styled from '@src/styles/styled-components';
import { withRipple } from '@src/enhancers/withRipple';
import Heading from '@src/components/atoms/Heading';
import HeaderItem from '@src/components/molecules/HeaderItem';

export interface Props {
  title: string;
  className?: string;
  onClickBack?: () => void;
  onClickSearch?: () => void;
}

const Container = styled.header<{ canBack: boolean }>`
  box-shadow: ${({ theme }) => theme.elevationShadowHeader};
  background-color: ${({ theme }) => theme.colorPrimary};
  padding-left: ${({ canBack, theme }) => (canBack ? '0' : theme.spacing2x)};
  display: flex;
`;

const StyledHeaderItem = withRipple(styled(HeaderItem)`
  width: ${({ theme }) => theme.headerHeight};
  height: ${({ theme }) => theme.headerHeight};
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    width: ${({ theme }) => theme.headerHeightWide};
    height: ${({ theme }) => theme.headerHeightWide};
  }
`);

const Title = styled(Heading)`
  flex-grow: 1;
  color: #fff;
  margin: 0;
  text-align: left;
  line-height: ${({ theme }) => theme.headerHeight};
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    line-height: ${({ theme }) => theme.headerHeightWide};
  }
`;

const renderArrowBack = () => <ArrowBack style={{ fontSize: '2.4rem' }} />;
const renderSearch = () => <Search style={{ fontSize: '2.4rem' }} />;

const Header = ({ title, className, onClickBack, onClickSearch }: Props) => (
  <Container canBack={!!onClickBack} className={className}>
    {!!onClickBack && <StyledHeaderItem renderIcon={renderArrowBack} onClick={onClickBack} data-test="back" />}
    <Title level={1} visualLevel={2}>
      {title}
    </Title>
    {!!onClickSearch && <StyledHeaderItem renderIcon={renderSearch} onClick={onClickSearch} data-test="search" />}
  </Container>
);

export default Header;
