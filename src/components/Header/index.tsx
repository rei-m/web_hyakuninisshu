import * as React from 'react';
import styled from '@src/styles/styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { withRipple } from '@src/enhancers/withRipple';

export interface Props {
  title: string;
  onClickBack?: () => void;
  onClickSearch?: () => void;
}

const Container = styled.header<{ canBack: boolean }>`
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  position: fixed;
  background-color: ${({ theme }) => theme.colorPrimary};
  padding-left: ${({ canBack, theme }) => (canBack ? '0' : theme.spacing2x)};
  display: flex;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #fff;
  line-height: ${({ theme }) => theme.headerHeight};
  margin: 0;
  font-weight: normal;
  text-align: left;
  flex-grow: 1;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    line-height: ${({ theme }) => theme.headerHeightWide};
  }
`;

const IconWrapper = withRipple(styled.span`
  line-height: ${({ theme }) => theme.headerHeight};
  width: ${({ theme }) => theme.headerHeight};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  cursor: pointer;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    line-height: ${({ theme }) => theme.headerHeightWide};
    width: ${({ theme }) => theme.headerHeightWide};
  }
`);

const Header: React.FC<Props> = ({ title, onClickBack, onClickSearch }) => (
  <Container canBack={!!onClickBack}>
    {!!onClickBack && (
      <IconWrapper onClick={onClickBack} data-test="back">
        <ArrowBackIcon />
      </IconWrapper>
    )}
    <Title>{title}</Title>
    {!!onClickSearch && (
      <IconWrapper onClick={onClickSearch} data-test="search">
        <SearchIcon />
      </IconWrapper>
    )}
  </Container>
);

export default Header;
