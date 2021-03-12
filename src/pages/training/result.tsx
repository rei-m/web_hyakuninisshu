import React from 'react';
import { graphql } from 'gatsby';
import QuestionDiContainerProvider from '@src/presentation/contexts/QuestionDiContainerProvider';
import TrainingResultPage from '@src/presentation/components/pages/training/result';
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

const TrainingResultGatsbyPage = ({ data }: Props) => {
  const allKarutaList = data.allKaruta.edges.map(
    (karutaData) => JSON.parse(karutaData.node.internal.content) as Karuta
  );
  return (
    <QuestionDiContainerProvider allKarutaList={allKarutaList}>
      <TrainingResultPage />
    </QuestionDiContainerProvider>
  );
};

export default TrainingResultGatsbyPage;

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
