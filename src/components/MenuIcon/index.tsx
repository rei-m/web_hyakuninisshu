import * as React from 'react';
import styled from 'styled-components';
import { MenuType } from '../../enums';
import { menuTypeToIcon } from '../../utils';

const Icon = styled.i`
  width: 150px;
  height: 150px;
  border: 4px solid;
  border-radius: 50%;
  color: #f1b400;
  font-size: 6rem;
  line-height: 142px;
  text-align: center;
`;

export interface MenuIconProps {
  readonly iconType: MenuType;
}

const MenuIcon = ({ iconType }: MenuIconProps) => (
  <Icon className="material-icons">{menuTypeToIcon(iconType)}</Icon>
);

export default MenuIcon;
