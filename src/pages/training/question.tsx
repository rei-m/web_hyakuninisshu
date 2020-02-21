import React from 'react';
import { graphql, navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlayingPageTemplate from '@src/components/templates/PlayingPageTemplate';
import TrainingQuestions from '@src/containers/organisms/TrainingQuestions';
import ReviewQuestions from '@src/containers/organisms/ReviewQuestions';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import Txt from '@src/components/atoms/Txt';
import { ROUTE_PATHS } from '@src/constants';
import { Karuta } from '@src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { ThemeInterface } from '@src/styles/theme';

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

export type TrainingState = {
  rangeFrom: RangeFromCondition;
  rangeTo: RangeToCondition;
  kimariji: KimarijiCondition;
  color: ColorCondition;
  kamiNoKuStyle: KarutaStyleCondition;
  shimoNoKuStyle: KarutaStyleCondition;
  questionAnim: QuestionAnimCondition;
  restart: false;
  submitTime: number;
};

export type RestartState = {
  restart: true;
  submitTime: number;
};

const useStyles = makeStyles<ThemeInterface>(() => ({
  errorMessage: {
    height: 300,
    width: '100%',
  },
}));

const onClickGoToResultHandler = () => {
  navigate(ROUTE_PATHS.TRAINING_RESULT, {
    replace: true,
  });
};

const onClickBackHandler = () => {
  navigate(ROUTE_PATHS.TRAINING, { replace: true });
};

const TrainingQuestionPage: React.FC<Props> = ({ data, location }) => {
  const karutas = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  // TODO: 本当はちゃんと中身をチェックしたほうがいい。。。
  const state = (location ? location.state : undefined) as TrainingState | RestartState | undefined;
  const classes = useStyles();
  return (
    <PlayingPageTemplate
      title={`百人一首 - 練習 -`}
      isDisplayNav={false}
      onClickBack={onClickBackHandler}
      content={
        state ? (
          state.restart ? (
            <ReviewQuestions {...state} onClickGoToResult={onClickGoToResultHandler} />
          ) : (
            <TrainingQuestions karutas={karutas} {...state} onClickGoToResult={onClickGoToResultHandler} />
          )
        ) : (
          <CenteredFrame tag={`div`} className={classes.errorMessage}>
            <Txt role={`error`}>不正な遷移を行いました。前の画面からやり直してください。</Txt>
          </CenteredFrame>
        )
      }
    />
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
