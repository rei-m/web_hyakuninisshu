import * as React from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';
import styled from '@src/styles/styled-components';
import NavigationItem from '@src/components/molecules/NavigationItem';
import { menuIcon } from '@src/components/atoms/MenuIcon';
import { MenuType } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';
import { withRipple } from '@src/enhancers/withRipple';

export interface Props {
  currentMenuType?: MenuType;
  className?: string;
}

const Container = styled.nav`
  display: flex;
  background-color: ${({ theme }) => theme.colorPrimary};
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  box-sizing: border-box;
`;

// withRippleの作りがイマイチなせいで必要。。。
const ItemWrapper = styled.span`
  flex-grow: 1;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-grow: 0;
    height: ${({ theme }) => theme.sideNavWidth};
  }
`;

const LinkWithRipple = withRipple<GatsbyLinkProps<{}>>(Link);

const renderIcon = (menuType: MenuType) => {
  const Icon = menuIcon(menuType);
  return <Icon />;
};

const WrappedItem = ({ to, menuType, active }: { to: string; menuType: MenuType; active: boolean }) => (
  <ItemWrapper>
    <LinkWithRipple to={to} style={{ width: '100%', height: '100%' }}>
      <NavigationItem menuType={menuType} active={active} renderIcon={renderIcon} />
    </LinkWithRipple>
  </ItemWrapper>
);

const Navigation: React.FC<Props> = ({ currentMenuType, className }) => (
  <Container className={className}>
    <WrappedItem
      to={ROUTE_PATHS.TRAINING}
      menuType={MenuType.Training}
      active={currentMenuType === MenuType.Training}
    />
    <WrappedItem to={ROUTE_PATHS.EXAM} menuType={MenuType.Exam} active={currentMenuType === MenuType.Exam} />
    <WrappedItem to={ROUTE_PATHS.KARUTAS} menuType={MenuType.Material} active={currentMenuType === MenuType.Material} />
    <WrappedItem to={ROUTE_PATHS.ABOUT} menuType={MenuType.Other} active={currentMenuType === MenuType.Other} />
  </Container>
);

export default Navigation;
