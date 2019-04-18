import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetaData } from '@src/types';

export interface DefaultSEOQueryData {
  site: {
    siteMetadata: SiteMetaData;
  };
  ogpImage: {
    publicURL: string;
  };
}

export const useSEO = (): DefaultSEOQueryData =>
  useStaticQuery(
    graphql`
      query DefaultSEOQuery {
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
