import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import styled from '@src/styles/styled-components';
import { Answer, Karuta, Question } from '@src/types';
import { toKarutaNoString } from '@src/utils';

export interface Props {
  questions: Question[];
  answers: Answer[];
  style?: React.CSSProperties;
  onClickResult: (karuta: Karuta) => void;
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
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colorThin};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  border-radius: 4px;
`;

const Cell = styled.div`
  width: 20%;
  height: 69px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KarutaNo = styled.span`
  font-size: 1.2rem;
`;

const CorrentImageBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const QuestionResultsMap: React.FC<Props> = ({ questions, answers, style, onClickResult }) => (
  <StaticQuery
    query={query}
    render={({ correctImage, incorrectImage }: QueryData) => (
      <Container style={style}>
        {questions.map((q, i) => {
          const onClickCell = () => onClickResult(q.correctKaruta);
          return (
            <Cell onClick={onClickCell} key={i} data-test={`question-${q.id}`}>
              <KarutaNo>{toKarutaNoString(q.correctKaruta.no)}</KarutaNo>
              <CorrentImageBox>
                <Img
                  fluid={answers[i].correct ? correctImage.childImageSharp.fluid : incorrectImage.childImageSharp.fluid}
                  style={{ width: '80%' }}
                />
              </CorrentImageBox>
            </Cell>
          );
        })}
      </Container>
    )}
  />
);

export default QuestionResultsMap;

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
