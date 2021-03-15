import { graphql, useStaticQuery } from 'gatsby';

export const useDogezaImage = () => {
  const { dogezaImage } = useStaticQuery(
    graphql`
      query DogezaImageQuery {
        dogezaImage: file(relativePath: { eq: "dogeza_businessman.png" }) {
          childImageSharp {
            gatsbyImageData(width: 200)
          }
        }
      }
    `
  );
  return dogezaImage.childImageSharp.gatsbyImageData;
};
