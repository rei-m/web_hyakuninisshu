import * as React from 'react';
import styled from '@src/styles/styled-components';
import { MenuType } from '@src/enums';
import { menuTypeToIcon } from '@src/utils';

export interface Props {
  iconType: MenuType;
}

const Icon = styled.i`
  width: 32px;
  height: 32px;
  font-size: 1.6rem;
  line-height: 26px;
  position: absolute;
  top: ${({ theme }) => theme.spacing1x};
  left: ${({ theme }) => theme.spacing1x};
  border: 2px solid;
  border-radius: 50%;
  color: #f1b400;
  text-align: center;

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    position: initial;
    width: 124px;
    height: 124px;
    border: 4px solid;
    font-size: 6rem;
    line-height: 116px;
  }
`;

const MenuIcon: React.FC<Props> = ({ iconType }) => <Icon className="material-icons">{menuTypeToIcon(iconType)}</Icon>;

export default MenuIcon;
