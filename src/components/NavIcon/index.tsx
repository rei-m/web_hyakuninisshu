import * as React from 'react';
import styled from '@src/styles/styled-components';
import { MenuType } from '@src/enums';
import MenuIconImage from '@src/components/MenuIconImage';

export interface Props {
  iconType: MenuType;
  text: string;
  isCurrent: boolean;
}

type IconWrapperProps = Pick<Props, 'text' | 'isCurrent'>;

const IconWrapper = styled.span<IconWrapperProps>`
  height: 56px;
  color: #fff;
  text-align: center;
  padding-top: 6px;
  box-sizing: border-box;
  position: relative;
  width: inherit;
  display: inline-block;
  opacity: ${props => (props.isCurrent ? 1 : 0.8)};
  &:after {
    content: '${props => props.text}';
    width: inherit;
    text-arign: center;
    position: absolute;
    bottom: 8px;
    left: 0;
    font-size: 1.2rem;
    opacity: 1;
  }
`;

const NavIcon: React.FC<Props> = ({ iconType, text, isCurrent }) => (
  <IconWrapper text={text} isCurrent={isCurrent}>
    <MenuIconImage iconType={iconType} />
  </IconWrapper>
);

export default NavIcon;
