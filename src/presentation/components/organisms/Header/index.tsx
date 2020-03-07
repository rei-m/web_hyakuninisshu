import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';
import HeaderItem from '@src/presentation/components/molecules/HeaderItem';
import Heading from '@src/presentation/components/atoms/Heading';
import { withRipple } from '@src/presentation/enhancers/withRipple';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  title: string;
  className?: string;
  onClickBack?: () => void;
  onClickSearch?: () => void;
};

const useStyles = makeStyles<ThemeInterface, { canBack: boolean }>(theme => ({
  root: {
    boxShadow: theme.elevationShadowHeader,
    backgroundColor: theme.palette.primary.main,
    paddingLeft: ({ canBack }) => (canBack ? 0 : theme.spacing(2)),
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    margin: 0,
    textAlign: 'left',
    lineHeight: theme.headerHeight,
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      lineHeight: theme.headerHeightWide,
    },
  },
  headerItem: {
    width: theme.headerHeight,
    height: theme.headerHeight,
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      width: theme.headerHeightWide,
      height: theme.headerHeightWide,
    },
  },
}));

type StyledHeaderItemProps = {
  id: string;
  renderIcon: () => React.ReactElement<SvgIconProps>;
  classes: { headerItem: string };
  onClick: () => void;
  className?: string;
};

const StyledHeaderItem = withRipple(({ id, renderIcon, classes, onClick, className = '' }: StyledHeaderItemProps) => {
  return (
    <HeaderItem
      renderIcon={renderIcon}
      onClick={onClick}
      data-test={id}
      className={clsx(classes.headerItem, className)}
    />
  );
});

const renderArrowBack = () => <ArrowBack style={{ fontSize: '2.4rem' }} />;
const renderSearch = () => <Search style={{ fontSize: '2.4rem' }} />;

const Header = ({ title, className = '', onClickBack, onClickSearch }: Props) => {
  const classes = useStyles({ canBack: !!onClickBack });
  return (
    <header className={clsx(classes.root, className)}>
      {!!onClickBack && (
        <StyledHeaderItem
          id="back"
          renderIcon={renderArrowBack}
          onClick={onClickBack}
          classes={{ headerItem: classes.headerItem }}
        />
      )}
      <Heading level={1} visualLevel={2} className={classes.title}>
        {title}
      </Heading>
      {!!onClickSearch && (
        <StyledHeaderItem
          id="search"
          renderIcon={renderSearch}
          onClick={onClickSearch}
          classes={{ headerItem: classes.headerItem }}
        />
      )}
    </header>
  );
};

export default Header;
