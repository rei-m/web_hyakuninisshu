import React from 'react';
import { graphql } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import QuestionDiContainerProvider from '@src/presentation/contexts/QuestionDiContainerProvider';
import TrainingPage from '@src/presentation/components/pages/training';
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
} & RouteComponentProps;

const TrainingGatsbyPage = ({ data, navigate }: Props) => {
  const allKarutaList = data.allKaruta.edges.map(
    (karutaData) => JSON.parse(karutaData.node.internal.content) as Karuta
  );
  return (
    <QuestionDiContainerProvider allKarutaList={allKarutaList}>
      <TrainingPage navigate={navigate} />
    </QuestionDiContainerProvider>
  );
};

export default TrainingGatsbyPage;

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
