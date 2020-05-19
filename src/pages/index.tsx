import React from 'react';
import { graphql } from 'gatsby';
import IndexPage from '@src/presentation/components/pages';
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

const IndexGatsbyPage = ({ data }: Props) => {
  const karutaList = data.allKaruta.edges.map((karutaData) => JSON.parse(karutaData.node.internal.content) as Karuta);
  return <IndexPage karutaCollection={{ karutaList }} />;
};

export default IndexGatsbyPage;

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
