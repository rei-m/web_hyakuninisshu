import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header from '@src/components/organisms/Header';
import Navigation from '@src/components/organisms/Navigation';
import { MenuType } from '@src/enums';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  title: string;
  currentMenuType?: MenuType;
  isDisplayNav: boolean;
  onClickBack?: () => void;
  onClickSearch?: () => void;
};

const useStyles = makeStyles<ThemeInterface, Pick<Props, 'isDisplayNav'>>(theme => ({
  root: {
    paddingTop: theme.headerHeight,
    paddingBottom: ({ isDisplayNav }) => (isDisplayNav ? theme.bottomNavHeight : 0),
    textAlign: 'center',
    minHeight: '100vh',
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      paddingTop: theme.headerHeightWide,
      paddingBottom: 0,
      paddingLeft: ({ isDisplayNav }) => (isDisplayNav ? theme.bottomNavHeight : 0),
    },
  },
  header: {
    left: 0,
    right: 0,
    top: 0,
    zIndex: 3,
    position: 'fixed',
  },
  nav: {
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    height: theme.bottomNavHeight,
    width: '100vw',
    zIndex: 2,
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      flexDirection: 'column',
      height: '100vh',
      width: theme.sideNavWidth,
      paddingTop: theme.headerHeightWide,
    },
  },
}));

const Layout: React.FC<Props> = ({ title, children, onClickBack, onClickSearch, isDisplayNav, currentMenuType }) => {
  const classes = useStyles({ isDisplayNav });
  return (
    <>
      <Header title={title} onClickBack={onClickBack} onClickSearch={onClickSearch} className={classes.header} />
      <main className={classes.root}>{children}</main>
      {isDisplayNav && <Navigation currentMenuType={currentMenuType} className={classes.nav} />}
    </>
  );
};

export default Layout;
