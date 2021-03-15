import { IGatsbyImageData } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

export interface QueryData {
  correctImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  incorrectImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

export const useCorrectImage = (): [IGatsbyImageData, IGatsbyImageData] => {
  const { correctImage, incorrectImage } = useStaticQuery(
    graphql`
      query CorrectImageQuery {
        correctImage: file(relativePath: { eq: "check_correct.png" }) {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
        }
        incorrectImage: file(relativePath: { eq: "check_incorrect.png" }) {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
        }
      }
    `
  );
  return [correctImage.childImageSharp.gatsbyImageData, incorrectImage.childImageSharp.gatsbyImageData];
};
