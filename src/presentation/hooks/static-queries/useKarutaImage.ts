import { IGatsbyImageData } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

export interface QueryData {
  karutaImages: {
    edges: Array<{
      node: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
        name: string;
      };
    }>;
  };
}

export const useKarutaImage = (karutaNo: number) => {
  const result: QueryData = useStaticQuery(
    graphql`
      query KarutaImageQuery {
        karutaImages: allFile(filter: { relativePath: { regex: "/karuta_....jpg/" } }) {
          edges {
            node {
              childImageSharp {
                gatsbyImageData(width: 200)
              }
              name
            }
          }
        }
      }
    `
  );
  const karutaImageNo = `00${karutaNo}`.slice(-3);
  const fileName = `karuta_${karutaImageNo}`;
  const resource = result.karutaImages.edges.find((i) => i.node.name.indexOf(fileName) > -1);

  if (!resource) {
    return undefined;
  }

  return resource.node.childImageSharp.gatsbyImageData;
};
