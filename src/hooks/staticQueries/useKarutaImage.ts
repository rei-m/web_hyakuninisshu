import { FluidObject } from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';

export interface QueryData {
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

export const useKarutaImage = (karutaNo: number) => {
  const result: QueryData = useStaticQuery(
    graphql`
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
    `
  );
  const karutaImageNo = `00${karutaNo}`.slice(-3);
  const fileName = `karuta_${karutaImageNo}.jpg`;
  const resource = result.karutaImages.edges.find(i => i.node.childImageSharp.fluid.src.indexOf(fileName) > -1);

  if (!resource) {
    return undefined;
  }

  return resource.node.childImageSharp.fluid;
};
