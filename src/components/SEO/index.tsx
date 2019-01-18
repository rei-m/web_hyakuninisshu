import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import { SiteMetaData } from '@src/types';

export interface Props {
  description?: string;
  lang?: string;
  meta?: Array<{
    name: string;
    content: string;
  }>;
  keywords?: string[];
  title: string;
}

export interface DefaultSEOQueryData {
  site: {
    siteMetadata: SiteMetaData;
  };
  ogpImage: {
    publicURL: string;
  };
}

const SEO: React.FC<Props> = ({ description, lang, meta, keywords, title }) => {
  const checkedLang: string = lang ? lang : 'ja';
  const checkedKeywords: string[] = keywords ? keywords : [];
  const checkedMeta: Array<{
    name: string;
    content: string;
  }> = meta ? meta : [];

  return (
    <StaticQuery
      query={query}
      render={(data: DefaultSEOQueryData) => {
        const checkedTitle = title || data.site.siteMetadata.title;
        const checkedDescription = description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang: checkedLang,
            }}
            title={checkedTitle}
            meta={[
              {
                name: `description`,
                content: checkedDescription,
              },
              {
                property: `og:title`,
                content: checkedTitle,
              },
              {
                property: `og:description`,
                content: checkedDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:image`,
                content: `https://hyakuninanki.net${data.ogpImage.publicURL}`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: checkedTitle,
              },
              {
                name: `twitter:description`,
                content: checkedDescription,
              },
              {
                name: `twitter:image`,
                content: `https://hyakuninanki.net${data.ogpImage.publicURL}`,
              },
            ]
              .concat(
                checkedKeywords.length > 0
                  ? {
                      name: `keywords`,
                      content: checkedKeywords.join(`, `),
                    }
                  : []
              )
              .concat(checkedMeta)}
          />
        );
      }}
    />
  );
};

export default SEO;

const query = graphql`
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
`;
