import React from 'react';
import { graphql } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import QuestionDiContainerProvider from '@src/presentation/contexts/QuestionDiContainerProvider';
import TrainingQuestionPage from '@src/presentation/components/pages/training/question';
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

const TrainingQuestionGatsbyPage = ({ data, navigate }: Props) => {
  const allKarutaList = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  return (
    <QuestionDiContainerProvider allKarutaList={allKarutaList}>
      <TrainingQuestionPage navigate={navigate} />
    </QuestionDiContainerProvider>
  );
};

export default TrainingQuestionGatsbyPage;

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
