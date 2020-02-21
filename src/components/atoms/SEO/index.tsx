import React from 'react';
import Helmet from 'react-helmet';
import { useSEO } from '@src/hooks/staticQueries/useSEO';

export type Props = {
  description?: string;
  lang?: string;
  meta?: Array<{
    name: string;
    content: string;
  }>;
  keywords?: string[];
  title: string;
};

const SEO = ({ description, lang = 'ja', meta = [], keywords = [], title }: Props) => {
  const { site, ogpImage } = useSEO();
  const checkedTitle = title || site.siteMetadata.title;
  const checkedDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{
        lang,
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
          content: `https://hyakuninanki.net${ogpImage.publicURL}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
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
          content: `https://hyakuninanki.net${ogpImage.publicURL}`,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  );
};

export default SEO;
