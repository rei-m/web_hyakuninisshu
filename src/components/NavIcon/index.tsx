import * as React from 'react';
import styled, { StyledFunction } from 'styled-components';
import { MenuType } from '../../enums';
import { menuTypeToIcon } from '../../utils';

interface IconProps {
  readonly text: string;
}

const i: StyledFunction<IconProps & React.HTMLProps<HTMLElement>> = styled.i;

const Icon = i`
  height: 56px;
  color: #fff;
  text-align: center;
  padding-top: 6px;
  box-sizing: border-box;
  position: relative;
  width: inherit;
  &:after {
    content: '${props => props.text}';
    width: inherit;
    text-arign: center;
    position: absolute;
    bottom: 10px;
    left: 0;
    font-size: 1.2rem;
  }
`;

export interface NavIconProps {
  readonly iconType: MenuType;
  readonly text: string;
}

const NavIcon = ({ iconType, text }: NavIconProps) => (
  <Icon className="material-icons" text={text}>
    {menuTypeToIcon(iconType)}
  </Icon>
);

export default NavIcon;
