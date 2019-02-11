import * as React from 'react';
import styled from '@src/styles/styled-components';
import { MenuType } from '@src/enums';
import MenuIconImage from '@src/components/MenuIconImage';

export interface Props {
  iconType: MenuType;
}

const IconWrapper = styled.span`
  width: 32px;
  height: 32px;
  font-size: 1.6rem;
  position: absolute;
  top: ${({ theme }) => theme.spacing1x};
  left: ${({ theme }) => theme.spacing1x};
  border: 2px solid;
  border-radius: 50%;
  color: #f1b400;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    position: initial;
    width: 124px;
    height: 124px;
    border: 4px solid;
    font-size: 6rem;
    margin: 0 auto;
  }
`;

const MenuIcon: React.FC<Props> = ({ iconType }) => (
  <IconWrapper>
    <MenuIconImage iconType={iconType} fontSize="inherit" />
  </IconWrapper>
);

export default MenuIcon;
