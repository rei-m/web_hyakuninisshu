import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import ClosableDialog from '@src/components/molecules/ClosableDialog';
import QuestionJudgement from '@src/components/molecules/QuestionJudgement';
import KarutaPlayingResult from '@src/components/organisms/KarutaPlayingResult';
import Material from '@src/components/organisms/Material';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { Answer, Karuta, Question } from '@src/types';

export interface OwnProps {
  onClickBack: () => void;
  onClickRestart: () => void;
}

export interface ConnectedProps {
  questions: Question[];
  answers: Answer[];
}

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

const StyledBlock = styled(Block)`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colorThin};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  border-radius: 4px;
  margin: ${({ theme }) => theme.spacingByPx(2)} 0;
`;

const StyledQuestionJudgement = styled(QuestionJudgement)`
  width: 20%;
  height: 69px;
  padding: ${({ theme }) => theme.spacingByPx(2)};
`;

export const ExamResultPresenter = ({
  questions,
  answers,
  displayedKaruta,
  onClickRestart,
  onClickBack,
  onClickResult,
  onCloseDialog,
}: PresenterProps) => (
  <KarutaPlayingResult answers={answers} onClickBack={onClickBack} onClickRestart={onClickRestart}>
    <StyledBlock>
      {questions.map((q, i) => (
        <StyledQuestionJudgement
          key={q.id}
          data-test={`question-${q.id}`}
          karuta={q.correctKaruta}
          correct={answers[i].correct}
          onClick={onClickResult}
        />
      ))}
    </StyledBlock>
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
