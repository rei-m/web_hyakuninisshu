import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetaData } from '@src/types';

export interface QueryData {
  site: {
    siteMetadata: SiteMetaData;
  };
  ogpImage: {
    publicURL: string;
  };
}

export const useSEO = (): QueryData =>
  useStaticQuery(
    graphql`
      query SEOQuery {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        ogpImage: file(relativePath: { eq: "app-icon.png" }) {
          publicURL
        }
      }
    `
  );
