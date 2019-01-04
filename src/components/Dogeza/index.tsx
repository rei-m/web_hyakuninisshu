import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

interface QueryData {
  dogezaImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const Dogeza: React.FC<React.ImgHTMLAttributes<{}>> = ({ alt, style }) => (
  <StaticQuery
    query={query}
    render={({ dogezaImage }: QueryData) => (
      <Img
        fluid={dogezaImage.childImageSharp.fluid}
        style={{
          width: 200,
          ...style,
        }}
        alt={alt}
      />
    )}
  />
);

export default Dogeza;

const query = graphql`
  query {
    dogezaImage: file(relativePath: { eq: "dogeza_businessman.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
