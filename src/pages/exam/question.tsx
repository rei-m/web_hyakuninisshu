import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import PlayingPageTemplate from '@src/components/templates/PlayingPageTemplate';
import ExamQuestions from '@src/containers/organisms/ExamQuestions';
import { ROUTE_PATHS } from '@src/constants';
import { Karuta } from '@src/types';

export interface Props {
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
}

export interface PresenterProps {
  karutas: Karuta[];
}

const onClickGoToResultHandler = () => {
  navigate(ROUTE_PATHS.EXAM_RESULT, {
    replace: true,
  });
};

const onClickBackHandler = () => {
  navigate(ROUTE_PATHS.EXAM, { replace: true });
};

export const ExamQuestionPagePresenter = ({ karutas }: PresenterProps) => (
  <PlayingPageTemplate
    title={`百人一首 - 腕試し -`}
    isDisplayNav={false}
    onClickBack={onClickBackHandler}
    content={<ExamQuestions karutas={karutas} onClickGoToResult={onClickGoToResultHandler} />}
  />
);

const ExamQuestionPage = ({ data }: Props) => {
  const karutas = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  return <ExamQuestionPagePresenter karutas={karutas} />;
};

export default ExamQuestionPage;

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
