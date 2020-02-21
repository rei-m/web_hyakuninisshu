import React from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NavigationItem from '@src/components/molecules/NavigationItem';
import { menuIcon } from '@src/components/atoms/MenuIcon';
import { MenuType } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';
import { withRipple } from '@src/enhancers/withRipple';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  currentMenuType?: MenuType;
  className?: string;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    boxShadow: theme.elevationShadow1x,
  },
  itemWrapper: {
    flexGrow: 1,
    width: '100%',
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      flexGrow: 0,
      height: theme.sideNavWidth,
    },
  },
}));

const LinkWithRipple = withRipple<GatsbyLinkProps<{}>>(Link);

const renderIcon = (menuType: MenuType) => {
  const Icon = menuIcon(menuType);
  return <Icon style={{ fontSize: '2.4rem' }} />;
};

const WrappedItem = ({
  to,
  menuType,
  active,
  className,
}: {
  to: string;
  menuType: MenuType;
  active: boolean;
  className: string;
}) => (
  <span className={className}>
    <LinkWithRipple to={to} style={{ width: '100%', height: '100%' }}>
      <NavigationItem menuType={menuType} active={active} renderIcon={renderIcon} />
    </LinkWithRipple>
  </span>
);

const Navigation: React.FC<Props> = ({ currentMenuType, className = '' }) => {
  const classes = useStyles();
  return (
    <nav className={clsx(classes.root, className)}>
      <WrappedItem
        to={ROUTE_PATHS.TRAINING}
        menuType={MenuType.Training}
        active={currentMenuType === MenuType.Training}
        className={classes.itemWrapper}
      />
      <WrappedItem
        to={ROUTE_PATHS.EXAM}
        menuType={MenuType.Exam}
        active={currentMenuType === MenuType.Exam}
        className={classes.itemWrapper}
      />
      <WrappedItem
        to={ROUTE_PATHS.KARUTAS}
        menuType={MenuType.Material}
        active={currentMenuType === MenuType.Material}
        className={classes.itemWrapper}
      />
      <WrappedItem
        to={ROUTE_PATHS.ABOUT}
        menuType={MenuType.Other}
        active={currentMenuType === MenuType.Other}
        className={classes.itemWrapper}
      />
    </nav>
  );
};

export default Navigation;
