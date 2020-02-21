import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { MenuType } from '@src/enums';
import Layout from '@src/components/templates/Layout';
import Ad from '@src/components/organisms/Ad';
import SEO from '@src/components/atoms/SEO';
import Block from '@src/components/atoms/Block';
import { ThemeInterface } from '@src/styles/theme';

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

const useStyles = makeStyles<ThemeInterface>(theme => ({
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
        <Ad type={`top`} />
        {middle}
        <Ad type={`responsive`} />
        {bottom}
      </Block>
    </Layout>
  );
};

export default TripleContentsPageTemplate;
