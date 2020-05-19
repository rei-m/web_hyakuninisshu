import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Layout from '@src/presentation/components/templates/Layout';
import Ad from '@src/presentation/components/organisms/Ad';
import { MenuType } from '@src/presentation/components/molecules/NavigationItem';
import SEO from '@src/presentation/components/atoms/SEO';
import Block from '@src/presentation/components/atoms/Block';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  title: string;
  description?: string;
  keywords: string[];
  menuType?: MenuType;
  isDisplayNav?: boolean;
  top: React.ReactElement;
  middle: React.ReactElement;
  bottom: React.ReactElement;
  onClickBack?: () => void;
  onClickSearch?: () => void;
};

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  content: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    maxWidth: 960,
    margin: 'auto',
    backgroundColor: theme.colorThin,
  },
}));

const TripleContentsPageTemplate = ({
  title,
  description,
  keywords,
  menuType,
  isDisplayNav = true,
  top,
  middle,
  bottom,
  onClickBack,
  onClickSearch,
}: Props) => {
  const classes = useStyles();
  return (
    <Layout
      title={title}
      isDisplayNav={isDisplayNav}
      currentMenuType={menuType}
      onClickBack={onClickBack}
      onClickSearch={onClickSearch}
    >
      <SEO title={title} keywords={keywords} description={description} />
      <Block className={classes.content}>
        {top}
        <Ad type={`responsive`} />
        {middle}
        {/* <Ad type={`responsive`} /> */}
        {bottom}
      </Block>
    </Layout>
  );
};

export default TripleContentsPageTemplate;
