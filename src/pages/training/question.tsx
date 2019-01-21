import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import TrainingQuestions from '@src/containers/TrainingQuestions';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import ErrorMessage from '@src/components/ErrorMessage';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  MenuType,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
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
  rangeFrom: RangeFromCondition;
  rangeTo: RangeToCondition;
  kimariji: KimarijiCondition;
  color: ColorCondition;
  kamiNoKuStyle: KarutaStyleCondition;
  shimoNoKuStyle: KarutaStyleCondition;
  questionAnim: QuestionAnimCondition;
  submitTime: number;
}

const TrainingQuestionPage: React.FC<Props> = ({ data, location }) => {
  const karutas = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  const state: LocationState | undefined = location ? location.state : undefined;
  const title = `百人一首 - 練習 -`;
  const description =
    '百人一首の暗記を練習できます。出題条件を組み合わせて自分にあったペースで練習できます。百人一首の歌の意味に触れながら楽しく覚えましょう。';
  const onClickBack = () => {
    navigate(ROUTE_PATHS.TRAINING, { replace: true });
  };

  return (
    <ErrorBoundary>
      <Layout title={title} isDisplayNav={false} currentMenuType={MenuType.Training} onClickBack={onClickBack}>
        <SEO
          title={title}
          keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
          description={description}
        />
        {state ? (
          <TrainingQuestions karutas={karutas} {...state} />
        ) : (
          <ErrorMessage text="不正な遷移を行いました。前の画面からやり直してください。" />
        )}
      </Layout>
    </ErrorBoundary>
  );
};

export default TrainingQuestionPage;

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
