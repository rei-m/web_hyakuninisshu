import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  type?: 'normal' | 'reader';
};

export interface QueryData {
  storeImage1: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  storeImage2: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  appBannerImage: {
    publicURL: string;
  };
}
const APP_STORE_URL = {
  normal: 'https://apple.co/3rTcFqq',
  reader: 'https://apple.co/3rTcFqq',
} as const;

const useStyles = makeStyles<ThemeInterface>(() => ({
  root: {
    width: 160,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const AppStoreBanner = ({ type = 'normal' }: Props) => {
  const result: QueryData = useStaticQuery(
    graphql`
      query AppStoreImageQuery1 {
        storeImage1: file(relativePath: { eq: "android_app_icon.png" }) {
          childImageSharp {
            gatsbyImageData(width: 120)
          }
        }
        storeImage2: file(relativePath: { eq: "android_app_reader_icon.png" }) {
          childImageSharp {
            gatsbyImageData(width: 120)
          }
        }
        appBannerImage: file(relativePath: { eq: "app_store_banner.svg" }) {
          publicURL
        }
      }
    `
  );
  const classes = useStyles();
  return (
    <a href={APP_STORE_URL[type]} target="_blank" rel="noreferrer" className={classes.root}>
      <GatsbyImage
        image={
          type === 'normal'
            ? result.storeImage1.childImageSharp.gatsbyImageData
            : result.storeImage2.childImageSharp.gatsbyImageData
        }
        style={{ width: 100, borderRadius: 16 }}
        alt="百人一首 簡単に暗記"
      />
      <img
        alt={`App Storeからダウンロード`}
        src={result.appBannerImage.publicURL}
        style={{ width: 120, marginTop: 8 }}
      />
    </a>
  );
};

export default AppStoreBanner;
