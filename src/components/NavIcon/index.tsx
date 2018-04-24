import * as React from 'react';
import styled, { StyledFunction } from 'styled-components';
import { MenuType } from '@src/enums';
import { menuTypeToIcon } from '@src/utils';

export interface NavIconProps {
  readonly iconType: MenuType;
  readonly text: string;
  readonly isCurrent: boolean;
}

type IconProps = Pick<NavIconProps, 'text' | 'isCurrent'>;

const i: StyledFunction<IconProps & React.HTMLProps<HTMLElement>> = styled.i;

const Icon = i`
  height: 56px;
  color: #fff;
  text-align: center;
  padding-top: 6px;
  box-sizing: border-box;
  position: relative;
  width: inherit;
  opacity: ${props => (props.isCurrent ? 1 : 0.8)};
  &:after {
    content: '${props => props.text}';
    width: inherit;
    text-arign: center;
    position: absolute;
    bottom: 10px;
    left: 0;
    font-size: 1.2rem;
    opacity: 1;
  }
`;

const NavIcon: React.SFC<NavIconProps> = ({ iconType, text, isCurrent }) => (
  <Icon className="material-icons" text={text} isCurrent={isCurrent}>
    {menuTypeToIcon(iconType)}
  </Icon>
);

export default NavIcon;
