import { FluidObject } from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';

export interface QueryData {
  correctImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  incorrectImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export const useCorrectImage = () => {
  const { correctImage, incorrectImage } = useStaticQuery(
    graphql`
      query {
        correctImage: file(relativePath: { eq: "check_correct.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        incorrectImage: file(relativePath: { eq: "check_incorrect.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );
  return [correctImage.childImageSharp.fluid, incorrectImage.childImageSharp.fluid];
};
