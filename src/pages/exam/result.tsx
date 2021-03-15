import React from 'react';
import { graphql } from 'gatsby';
import QuestionDiContainerProvider from '@src/presentation/contexts/QuestionDiContainerProvider';
import ExamResultPage from '@src/presentation/components/pages/exam/result';
import { Karuta } from '@src/domain/models';

export type Props = {
  data: {
    allKaruta: {
      edges: Array<{
        node: {
          internal: {
            content: string;
          };
        };
      }>;
    };
  };
};

const ExamResultGatsbyPage = ({ data }: Props) => {
  const allKarutaList = data.allKaruta.edges.map(
    (karutaData) => JSON.parse(karutaData.node.internal.content) as Karuta
  );
  return (
    <QuestionDiContainerProvider allKarutaList={allKarutaList}>
      <ExamResultPage />
    </QuestionDiContainerProvider>
  );
};

export default ExamResultGatsbyPage;

export const query = graphql`
  query {
    allKaruta(sort: { fields: [no], order: ASC }) {
      edges {
        node {
          internal {
            content
          }
        }
      }
    }
  }
`;
