import { graphql, useStaticQuery } from 'gatsby';

export const useDogezaImage = () => {
  const { dogezaImage } = useStaticQuery(
    graphql`
      query DogezaImageQuery {
        dogezaImage: file(relativePath: { eq: "dogeza_businessman.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );
  return dogezaImage.childImageSharp.fluid;
};
