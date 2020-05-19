import React, { useLayoutEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import SingleContentPageTemplate from '@src/presentation/components/templates/SingleContentPageTemplate';
import { EditButton } from '@src/presentation/components/molecules/IconLabelButton';
import Paragraph from '@src/presentation/components/atoms/Paragraph';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { useQuestionDiContainer } from '@src/presentation/hooks/useQuestionDiContainer';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';

export type Props = Pick<RouteComponentProps, 'navigate'>;

export type PresenterProps = {
  onClickStartExam: () => void;
  onClickBack: () => void;
};

export type ContainerProps = {
  presenter: (props: PresenterProps) => React.ReactElement;
} & Props;

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  explain: {
    padding: theme.spacing(4, 2),
  },
  startExamButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    boxShadow: theme.elevationShadow1x,
  },
}));

export const Presenter = ({ onClickStartExam, onClickBack }: PresenterProps) => {
  const classes = useStyles();
  return (
    <SingleContentPageTemplate
      title={`百人一首 - 腕試し -`}
      description={`百人一首の暗記を練習できます。百首覚えられているかチャレンジしましょう。`}
      keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
      pageTitle={`腕試し`}
      menuType={'exam'}
      onClickBack={onClickBack}
      content={
        <>
          <Paragraph size={`m`} className={classes.explain}>
            全百首からランダムに出題されます。
            <br />
            練習の成果を確認しましょう。
          </Paragraph>
          <EditButton type={`accent`} onClick={onClickStartExam} className={classes.startExamButton}>
            腕試しをはじめる
          </EditButton>
        </>
      }
    />
  );
};

type PickedState = Pick<questionsTypes.State, 'state'>;

export const Container = ({ navigate, presenter }: ContainerProps) => {
  const { questionsActionCreator } = useQuestionDiContainer();
  const dispatch = useDispatch();
  const pickedState = useSelector<GlobalState, PickedState>(
    (state) => ({ state: state.questions.state }),
    (left, right) => left.state === right.state
  );

  useLayoutEffect(() => {
    if (pickedState.state === 'ready') {
      if (navigate) {
        navigate(paths.examQuestion());
      }
    }
  }, [pickedState.state]);

  const handleClickStartExam = () => {
    const action = questionsActionCreator.startExam();
    dispatch(action);
  };

  const handleClickBack = () => {
    if (navigate) {
      navigate(paths.root(), { replace: true });
    }
  };

  return presenter({ onClickStartExam: handleClickStartExam, onClickBack: handleClickBack });
};

const ExamPage = (props: Props) => <Container {...props} presenter={Presenter} />;

export default ExamPage;
