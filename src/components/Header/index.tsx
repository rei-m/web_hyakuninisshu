import * as React from 'react';
import styled, { ThemedStyledFunction } from 'styled-components';
import { Theme } from '../../styles';

interface RootProps {
  readonly canBack: boolean;
}

const header: ThemedStyledFunction<
  RootProps & React.HTMLProps<HTMLElement>,
  Theme
> =
  styled.header;

const Root = header`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  left: 0;
  right: 0;
  z-index: 1;
  position: fixed;
  background-color: ${({ theme }) => theme.color_primary};
  padding-left: ${({ canBack }) => (canBack ? '0' : '16px')};
  display: flex;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: white;
  line-height: 56px;
  margin: 0;
  font-weight: normal;
  text-align: left;

  @media screen and (min-width: 768px) {
    line-height: 64px;
  }
`;

const Icon = styled.i`
  line-height: 56px;
  width: 56px;
  color: #fff;
  text-align: center;
  @media screen and (min-width: 768px) {
    line-height: 64px;
    width: 64px;
  }
`;

export interface HeaderProps {
  readonly subTitle: string;
  readonly canBack: boolean;
  readonly onClickBack: () => void;
}

const Header = ({ subTitle, canBack, onClickBack }: HeaderProps) => (
  <Root canBack={canBack}>
    {canBack && (
      <Icon className="material-icons" onClick={onClickBack}>
        arrow_back
      </Icon>
    )}
    <Title>百人一首 - {subTitle} -</Title>
  </Root>
);

export default Header;
