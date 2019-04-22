import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import styled from '@src/styles/styled-components';
import { MenuType } from '@src/enums';
import CenteredFrame from '@src/components/atoms/CenteredFrame';

export interface Props {
  menuType: MenuType;
  active?: boolean;
  className?: string;
  renderIcon: (menuType: MenuType) => React.ReactElement<SvgIconProps>;
  onClick?: () => void;
}

type IconWrapperProps = Pick<Props, 'menuType' | 'active'>;

const Container = styled(CenteredFrame)<IconWrapperProps>`
  height: 56px;
  color: #fff;
  position: relative;
  box-sizing: border-box;
  width: inherit;
  opacity: ${props => (props.active ? 1 : 0.8)};
  svg {
    margin-bottom: 18px;
  }
  &:after {
    content: '${props => props.menuType}';
    bottom: 8px;
    position: absolute;
    font-size: 1.2rem;
    opacity: 1;
  }
`;

const NavigationItem = ({ menuType, active, className, renderIcon, onClick }: Props) => (
  <Container menuType={menuType} active={active} className={className} onClick={onClick}>
    {renderIcon(menuType)}
  </Container>
);

export default NavigationItem;
