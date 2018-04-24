import * as React from 'react';
import styled from 'styled-components';
import { MenuType } from '@src/enums';
import { menuTypeToIcon } from '@src/utils';

export interface MenuIconProps {
  readonly iconType: MenuType;
}

const Icon = styled.i`
  width: 124px;
  height: 124px;
  border: 4px solid;
  border-radius: 50%;
  color: #f1b400;
  font-size: 6rem;
  line-height: 116px;
  text-align: center;
`;

const MenuIcon: React.SFC<MenuIconProps> = ({ iconType }) => (
  <Icon className="material-icons">{menuTypeToIcon(iconType)}</Icon>
);

export default MenuIcon;
