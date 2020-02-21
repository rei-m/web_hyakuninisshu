import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import ClosableDialog from '@src/components/molecules/ClosableDialog';
import QuestionJudgement from '@src/components/molecules/QuestionJudgement';
import KarutaPlayingResult from '@src/components/organisms/KarutaPlayingResult';
import Material from '@src/components/organisms/Material';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { Answer, Karuta, Question } from '@src/types';
import { ThemeInterface } from '@src/styles/theme';

export type OwnProps = {
  onClickBack: () => void;
  onClickRestart: () => void;
};

export type ConnectedProps = {
  questions: Question[];
  answers: Answer[];
};

export type PresenterProps = OwnProps &
  ConnectedProps & {
    displayedKaruta?: Karuta;
    onClickResult: (karuta: Karuta) => void;
    onCloseDialog: () => void;
  };

export type ContainerProps = OwnProps & {
  presenter: React.FC<PresenterProps>;
};

const useMaterialDialog = (): [Karuta | undefined, (karuta: Karuta) => void, () => void] => {
  const [karuta, setKaruta] = React.useState<Karuta>();
  const closeDialog = React.useCallback(() => {
    setKaruta(undefined);
  }, []);

  return [karuta, setKaruta, closeDialog];
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.colorThin,
    boxSizing: 'border-box',
    boxShadow: theme.elevationShadow1x,
    borderRadius: 4,
    margin: theme.spacing(2, 0),
  },
  questionJudgement: {
    width: '20%',
    height: 69,
    padding: theme.spacing(2),
  },
}));

export const ExamResultPresenter = ({
  questions,
  answers,
  displayedKaruta,
  onClickRestart,
  onClickBack,
  onClickResult,
  onCloseDialog,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <KarutaPlayingResult answers={answers} onClickBack={onClickBack} onClickRestart={onClickRestart}>
      <Block className={classes.content}>
        {questions.map((q, i) => (
          <QuestionJudgement
            key={q.id}
            data-test={`question-${q.id}`}
            karuta={q.correctKaruta}
            correct={answers[i].correct}
            onClick={onClickResult}
            className={classes.questionJudgement}
          />
        ))}
      </Block>
      <ClosableDialog
        open={!!displayedKaruta}
        onClose={onCloseDialog}
        PaperProps={{
          style: { maxWidth: 380 },
        }}
      >
        {displayedKaruta && <Material karuta={displayedKaruta} />}
      </ClosableDialog>
    </KarutaPlayingResult>
  );
};

export const ExamResultContainer = ({ presenter, onClickRestart, onClickBack }: ContainerProps) => {
  const { questions, answers } = useSelector<GlobalState, questionsTypes.State>(state => state.questions);
  const [displayedKaruta, openDialog, closeDialog] = useMaterialDialog();
  return presenter({
    questions: questions ? questions : [],
    answers: answers ? answers : [],
    displayedKaruta,
    onClickRestart,
    onClickBack,
    onClickResult: openDialog,
    onCloseDialog: closeDialog,
  });
};

export const ExamResult = (props: OwnProps) => <ExamResultContainer presenter={ExamResultPresenter} {...props} />;

export default ExamResult;
