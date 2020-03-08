import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { paths } from '@src/presentation/routes';
import PlayingPageTemplate from '@src/presentation/components/templates/PlayingPageTemplate';
import KarutaPlayingContainer from '@src/presentation/containers/organisms/KarutaPlayingContainer';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';

export type Props = Pick<RouteComponentProps, 'navigate'>;

type PickedState = {
  kamiNoKuStyle: questionsTypes.KarutaStyleCondition;
  shimoNoKuStyle: questionsTypes.KarutaStyleCondition;
  questionAnim: questionsTypes.QuestionAnimCondition;
};

const TrainingQuestionPage = ({ navigate }: Props) => {
  const { kamiNoKuStyle, shimoNoKuStyle, questionAnim } = useSelector<GlobalState, PickedState>(
    state => state.questions.trainingCondition,
    (left, right) => {
      return (
        left.kamiNoKuStyle === right.kamiNoKuStyle &&
        left.shimoNoKuStyle === right.shimoNoKuStyle &&
        left.questionAnim === right.questionAnim
      );
    }
  );

  const handleClickBack = useCallback(() => {
    if (navigate) {
      navigate(paths.training(), { replace: true });
    }
  }, [navigate]);

  return (
    <PlayingPageTemplate
      title={`百人一首 - 練習 -`}
      isDisplayNav={false}
      onClickBack={handleClickBack}
      content={
        <KarutaPlayingContainer
          kamiNoKuStyle={kamiNoKuStyle}
          shimoNoKuStyle={shimoNoKuStyle}
          questionAnim={questionAnim}
          resultUrl={paths.trainingResult()}
        />
      }
    />
  );
};

export default TrainingQuestionPage;
