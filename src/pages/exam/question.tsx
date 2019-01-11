import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { graphql, navigate } from 'gatsby';
import ExamQuestions from '@src/containers/ExamQuestions';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import ErrorMessage from '@src/components/ErrorMessage';
import { MenuType } from '@src/enums';
import { ROUTE_PATHS } from '@src/constants';
import { Karuta } from '@src/types';

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
} & RouteComponentProps<{}>;

export interface LocationState {
  submitTime: number;
}

const ExamQuestionPage: React.FC<Props> = ({ data, location }) => {
  const karutas = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  const state: LocationState | undefined = location ? location.state : undefined;
  const title = `百人一首 - 腕試し -`;
  const description = '百人一首の暗記を練習できます。百首覚えられているかチャレンジしましょう。';
  const onClickBack = () => {
    navigate(ROUTE_PATHS.EXAM, { replace: true });
  };

  return (
    <ErrorBoundary>
      <Layout
        title={title}
        canBack={true}
        isDisplayNav={false}
        currentMenuType={MenuType.Exam}
        onClickBack={onClickBack}
      >
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={description}
        />
        {state ? (
          <ExamQuestions karutas={karutas} {...state} />
        ) : (
          <ErrorMessage text="不正な遷移を行いました。前の画面からやり直してください。" />
        )}
      </Layout>
    </ErrorBoundary>
  );
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
