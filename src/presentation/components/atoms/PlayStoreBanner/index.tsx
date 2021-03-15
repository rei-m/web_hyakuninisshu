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
}
const PLAY_STORE_URL = {
  normal:
    'https://play.google.com/store/apps/details?id=me.rei_m.hyakuninisshu&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
  reader:
    'https://play.google.com/store/apps/details?id=net.hyakuninanki.reader&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
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

const PlayStoreBanner = ({ type = 'normal' }: Props) => {
  const result: QueryData = useStaticQuery(
    graphql`
      query PlayStoreImageQuery1 {
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
      }
    `
  );
  const classes = useStyles();
  return (
    <a href={PLAY_STORE_URL[type]} target="_blank" rel="noreferrer" className={classes.root}>
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
        alt={`Google Play で手に入れよう`}
        src={`https://play.google.com/intl/ja/badges/static/images/badges/ja_badge_web_generic.png`}
        style={{ width: 140 }}
      />
    </a>
  );
};

export default PlayStoreBanner;
