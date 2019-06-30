import { SiteMetaData } from '../src/types';
import { GatsbyPlugin } from './types';

export const siteMetadata: SiteMetaData = {
  title: `百人一首 - 簡単に暗記 -`,
  description: `百人一首の暗記を練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`,
  author: `@rei-m`,
};

export const plugins: GatsbyPlugin[] = [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/../src/images`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `百人一首 - 簡単に暗記 -`,
      short_name: `百人一首`,
      start_url: `/`,
      background_color: `#8bc34a`,
      theme_color: `#8bc34a`,
      display: `minimal-ui`,
      icon: `src/images/app-icon.png`, // This path is relative to the root of the site.
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.app/offline
  // 'gatsby-plugin-offline',
  {
    resolve: `gatsby-plugin-material-ui`,
    options: {
      stylesProvider: {
        injectFirst: true,
      },
    },
  },
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/styles/typography.ts`,
    },
  },
  `gatsby-plugin-typescript`,
  // `gatsby-plugin-remove-trailing-slashes`,
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-no-sourcemaps`,
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: `UA-46787228-6`,
    },
  },
];
