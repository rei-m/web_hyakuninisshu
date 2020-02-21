import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Layout from '@src/presentation/components/templates/Layout';
import { MenuType } from '@src/presentation/components/molecules/NavigationItem';
import TatamiLayout from '@src/presentation/components/molecules/TatamiLayout';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  title: string;
  menuType?: MenuType;
  isDisplayNav?: boolean;
  content: React.ReactElement;
  onClickBack?: () => void;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: '100%',
    minHeight: `calc(100vh - ${theme.headerHeight})`,
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      minHeight: `calc(100vh - ${theme.headerHeightWide})`,
    },
  },
}));

const PlayingPageTemplate = ({ content, title, menuType, isDisplayNav = false, onClickBack }: Props) => {
  const classes = useStyles();
  return (
    <Layout title={title} isDisplayNav={isDisplayNav} currentMenuType={menuType} onClickBack={onClickBack}>
      <TatamiLayout className={classes.content}>{content}</TatamiLayout>
    </Layout>
  );
};

export default PlayingPageTemplate;
