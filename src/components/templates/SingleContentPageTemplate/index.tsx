import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { MenuType } from '@src/enums';
import Layout from '@src/components/templates/Layout';
import Ad from '@src/components/organisms/Ad';
import SEO from '@src/components/atoms/SEO';
import Heading from '@src/components/atoms/Heading';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  title: string;
  description?: string;
  keywords: string[];
  pageTitle: string;
  menuType?: MenuType;
  isDisplayNav?: boolean;
  content: React.ReactElement;
  onClickBack?: () => void;
  onClickSearch?: () => void;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  content: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: '100%',
    backgroundColor: theme.colorThin,
  },
  sectionTitle: {
    margin: theme.spacing(1),
  },
}));

const SingleContentPageTemplate = ({
  content,
  title,
  description,
  keywords,
  pageTitle,
  menuType,
  isDisplayNav = true,
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
      <section className={classes.content}>
        <Heading level={2} className={classes.sectionTitle}>
          {pageTitle}
        </Heading>
        <Ad type={`top`} />
        {content}
        <Ad type={`responsive`} />
      </section>
    </Layout>
  );
};

export default SingleContentPageTemplate;
