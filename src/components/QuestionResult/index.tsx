import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import styled from '@src/styles/styled-components';
import { Answer } from '@src/types';

export interface Props {
  answer: Answer;
  onClick: () => void;
}

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

const Container = styled.div`
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled(Img)`
  width: 300px;
  height: 300px;
`;

const QuestionResult: React.FC<Props> = ({ answer, onClick }) => (
  <StaticQuery
    query={query}
    render={({ correctImage, incorrectImage }: QueryData) => (
      <Container onClick={onClick}>
        {answer.correct ? (
          <Image fluid={correctImage.childImageSharp.fluid} />
        ) : (
          <Image fluid={incorrectImage.childImageSharp.fluid} />
        )}
      </Container>
    )}
  />
);

export default QuestionResult;

const query = graphql`
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
`;
