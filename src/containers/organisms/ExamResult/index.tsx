import * as React from 'react';
import { connect } from 'react-redux';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import ClosableDialog from '@src/components/molecules/ClosableDialog';
import QuestionJudgement from '@src/components/molecules/QuestionJudgement';
import KarutaPlayingResult from '@src/components/organisms/KarutaPlayingResult';
import Material from '@src/components/organisms/Material';
import { GlobalState } from '@src/state';
import { Answer, Karuta, Question } from '@src/types';

export interface OwnProps {
  onClickBack: () => void;
  onClickRestart: () => void;
}

export interface ConnectedProps {
  questions: Question[];
  answers: Answer[];
}

export type Props = OwnProps & ConnectedProps;

export type PresenterProps = Props & {
  displayedKaruta?: Karuta;
  onClickResult: (karuta: Karuta) => void;
  onCloseDialog: () => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
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
  margin: ${({ theme }) => theme.spacing2x} 0;
`;

const StyledQuestionJudgement = styled(QuestionJudgement)`
  width: 20%;
  height: 69px;
  padding: ${({ theme }) => theme.spacing2x};
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

export const ExamResultContainer = ({ presenter, questions, answers, onClickRestart, onClickBack }: ContainerProps) => {
  const [displayedKaruta, openDialog, closeDialog] = useMaterialDialog();
  return presenter({
    questions,
    answers,
    displayedKaruta,
    onClickRestart,
    onClickBack,
    onClickResult: openDialog,
    onCloseDialog: closeDialog,
  });
};

export const ExamResult = (props: Props) => <ExamResultContainer presenter={ExamResultPresenter} {...props} />;

export const mapStateToProps = ({ questions }: GlobalState): ConnectedProps => ({
  questions: questions.questions ? questions.questions : [],
  answers: questions.answers ? questions.answers : [],
});

export default connect(mapStateToProps)(ExamResult);
