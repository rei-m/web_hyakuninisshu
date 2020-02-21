import { graphql, useStaticQuery } from 'gatsby';

export const useTatamiImage = (): string => {
  const { tatamiImage } = useStaticQuery(
    graphql`
      query TatamiImageQuery {
        tatamiImage: file(relativePath: { eq: "tatami_part.png" }) {
          publicURL
        }
      }
    `
  );
  return tatamiImage.publicURL;
};
