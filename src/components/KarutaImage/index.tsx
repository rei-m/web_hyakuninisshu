import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { toKarutaNoString } from '@src/utils';

export interface Props {
  karutaNo: number;
  style?: React.CSSProperties;
}

interface QueryData {
  karutaImages: {
    edges: Array<{
      node: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    }>;
  };
}

const KarutaImage: React.FC<Props> = ({ karutaNo, style }) => (
  <StaticQuery
    query={graphql`
      query {
        karutaImages: allFile(filter: { relativePath: { regex: "/karuta_....jpg/" } }) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={({ karutaImages }: QueryData) => {
      const karutaImageNo = `00${karutaNo}`.slice(-3);
      const fileName = `karuta_${karutaImageNo}.jpg`;
      const resource = karutaImages.edges.find(i => i.node.childImageSharp.fluid.src.indexOf(fileName) > -1);
      return (
        <Img
          fluid={resource!.node.childImageSharp.fluid}
          style={{
            width: 380,
            ...style,
          }}
          alt={toKarutaNoString(karutaNo)}
        />
      );
    }}
  />
);

export default KarutaImage;
