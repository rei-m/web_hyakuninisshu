import React from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import NavigationItem, { MenuType } from '@src/presentation/components/molecules/NavigationItem';
import { ExamIcon, MaterialIcon, TrainingIcon, OtherIcon } from '@src/presentation/components/atoms/MenuIcon';
import { withRipple } from '@src/presentation/enhancers/withRipple';
import { ThemeInterface } from '@src/presentation/styles/theme';

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

const ICON_MAP = {
  training: TrainingIcon,
  exam: ExamIcon,
  material: MaterialIcon,
  other: OtherIcon,
} as const;

const renderIcon = (menuType: MenuType) => {
  const Icon = ICON_MAP[menuType];
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
        to={paths.training()}
        menuType={'training'}
        active={currentMenuType === 'training'}
        className={classes.itemWrapper}
      />
      <WrappedItem
        to={paths.exam()}
        menuType={'exam'}
        active={currentMenuType === 'exam'}
        className={classes.itemWrapper}
      />
      <WrappedItem
        to={paths.karutas()}
        menuType={'material'}
        active={currentMenuType === 'material'}
        className={classes.itemWrapper}
      />
      <WrappedItem
        to={paths.about()}
        menuType={'other'}
        active={currentMenuType === 'other'}
        className={classes.itemWrapper}
      />
    </nav>
  );
};

export default Navigation;
