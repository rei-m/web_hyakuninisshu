import React, { useLayoutEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import SingleContentPageTemplate from '@src/presentation/components/templates/SingleContentPageTemplate';
import TrainingMenuForm from '@src/presentation/containers/organisms/TrainingMenuForm';
import Block from '@src/presentation/components/atoms/Block';
import Txt from '@src/presentation/components/atoms/Txt';
import { sendGaEvent } from '@src/presentation/analytics';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { questionsTypes } from '@src/state/questions';
import { useQuestionDiContainer } from '@src/presentation/hooks/useQuestionDiContainer';
import { GlobalState } from '@src/state';

export type Props = {};

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  formContainer: {
    padding: theme.spacing(2, 0),
    maxWidth: 380,
    margin: 'auto',
  },
  errorMessageContainer: {
    padding: theme.spacing(2),
  },
  errorMessage: {
    color: theme.palette.error.main,
  },
}));

type PickedState = Pick<questionsTypes.State, 'state'>;

const TrainingPage = (_: Props) => {
  const { questionsActionCreator } = useQuestionDiContainer();
  const dispatch = useDispatch();
  const pickedState = useSelector<GlobalState, PickedState>(
    (state) => ({ state: state.questions.state }),
    (left, right) => left.state === right.state
  );

  const [error, setError] = useState<string>();

  const handleSubmit = (
    rangeFrom: questionsTypes.RangeFromCondition,
    rangeTo: questionsTypes.RangeToCondition,
    kimariji: questionsTypes.KimarijiCondition,
    color: questionsTypes.ColorCondition,
    kamiNoKuStyle: questionsTypes.KarutaStyleCondition,
    shimoNoKuStyle: questionsTypes.KarutaStyleCondition,
    questionAnim: questionsTypes.QuestionAnimCondition
  ) => {
    sendGaEvent(
      'Training',
      'click',
      JSON.stringify({
        color,
        kamiNoKuStyle,
        kimariji,
        rangeFrom,
        rangeTo,
        shimoNoKuStyle,
        questionAnim,
      })
    );

    try {
      const action = questionsActionCreator.startTraining(
        rangeFrom,
        rangeTo,
        kimariji,
        color,
        kamiNoKuStyle,
        shimoNoKuStyle,
        questionAnim
      );
      dispatch(action);
    } catch (error) {
      setError('指定した条件の歌がありませんでした');
    }
  };

  const handleClickBack = () => {
    if (navigate) {
      navigate(paths.root(), { replace: true });
    }
  };

  const classes = useStyles();

  useLayoutEffect(() => {
    if (pickedState.state === 'ready') {
      if (navigate) {
        navigate(paths.trainingQuestion());
      }
    }
  }, [pickedState.state]);

  return (
    <SingleContentPageTemplate
      title={`百人一首 - 練習 -`}
      description={`百人一首の暗記を練習できます。出題条件を組み合わせて自分にあったペースで練習できます。百人一首の歌の意味に触れながら楽しく覚えましょう。`}
      keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
      pageTitle={`出題設定`}
      menuType={'training'}
      onClickBack={handleClickBack}
      content={
        <>
          {error && (
            <Block className={classes.errorMessageContainer}>
              <Txt className={classes.errorMessage}>{error}</Txt>
            </Block>
          )}
          <Block className={classes.formContainer}>
            <TrainingMenuForm onSubmit={handleSubmit} />
          </Block>
        </>
      }
    />
  );
};

export default TrainingPage;
