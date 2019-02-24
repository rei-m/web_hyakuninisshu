import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Progress, { Props as ProgressProps } from '@src/components/Progress';
import { questionsOperations, questionsTypes } from '@src/state/questions';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { Karuta } from '@src/types';
import { GlobalState } from '@src/state';

export interface OwnProps {
  karutas: Karuta[];
  rangeFrom: RangeFromCondition;
  rangeTo: RangeToCondition;
  kimariji: KimarijiCondition;
  color: ColorCondition;
  kamiNoKuStyle: KarutaStyleCondition;
  shimoNoKuStyle: KarutaStyleCondition;
  questionAnim: QuestionAnimCondition;
}

export type DispatchProps = Pick<ProgressProps, 'onStart'>;

export type Props = OwnProps & DispatchProps;

const TrainingInitializer = ({ onStart }: Props) => <Progress onStart={onStart} />;

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, {}, questionsTypes.Actions>,
  { karutas, rangeFrom, rangeTo, kimariji, color, kamiNoKuStyle, shimoNoKuStyle, questionAnim }: OwnProps
): DispatchProps => ({
  onStart: () => {
    dispatch(
      questionsOperations.startTraining(
        karutas,
        rangeFrom,
        rangeTo,
        kimariji,
        color,
        kamiNoKuStyle,
        shimoNoKuStyle,
        questionAnim
      )
    );
  },
});

export default connect(
  undefined,
  mapDispatchToProps
)(TrainingInitializer);
