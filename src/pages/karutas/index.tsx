import React from 'react';
import { graphql } from 'gatsby';
import KarutasPage from '@src/presentation/components/pages/karutas';
import { Karuta } from '@src/domain/models';

export type OwnProps = {
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

const KarutasGatsbyPage = ({ data }: OwnProps) => {
  const karutaList = data.allKaruta.edges.map((karutaData) => JSON.parse(karutaData.node.internal.content) as Karuta);
  return <KarutasPage karutaCollection={{ karutaList }} />;
};

export default KarutasGatsbyPage;

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
