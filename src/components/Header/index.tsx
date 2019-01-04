import * as React from 'react';
import styled from '@src/styles/styled-components';
import { withRipple } from '@src/enhancers/withRipple';

export interface Props {
  title: string;
  canBack: boolean;
  onClickBack: () => void;
}

type RootProps = Pick<Props, 'canBack'>;

const Container = styled.header<RootProps>`
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  left: 0;
  right: 0;
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
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    line-height: ${({ theme }) => theme.headerHeightWide};
  }
`;

const Icon = withRipple(styled.i`
  line-height: ${({ theme }) => theme.headerHeight};
  width: ${({ theme }) => theme.headerHeight};
  color: #fff;
  text-align: center;
  cursor: pointer;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    line-height: ${({ theme }) => theme.headerHeightWide};
    width: ${({ theme }) => theme.headerHeightWide};
  }
`);

const Header: React.FC<Props> = ({ title, canBack, onClickBack }) => (
  <Container canBack={canBack}>
    {canBack && (
      <Icon className="material-icons" onClick={onClickBack} data-test="back">
        arrow_back
      </Icon>
    )}
    <Title>{title}</Title>
  </Container>
);

export default Header;
