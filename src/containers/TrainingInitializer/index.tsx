import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Progress, { Props as ProgressProps } from '@src/components/Progress';
import { startTraining, QuestionsActions } from '@src/actions/questions';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
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
}

export type DispatchProps = Pick<ProgressProps, 'onStart'>;

export type Props = OwnProps & DispatchProps;

const TrainingInitializer = ({ onStart }: Props) => <Progress onStart={onStart} />;

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, {}, QuestionsActions>,
  { karutas, rangeFrom, rangeTo, kimariji, color, kamiNoKuStyle, shimoNoKuStyle }: OwnProps
): DispatchProps => ({
  onStart: () => {
    dispatch(startTraining(karutas, rangeFrom, rangeTo, kimariji, color, kamiNoKuStyle, shimoNoKuStyle));
  },
});

export default connect(
  undefined,
  mapDispatchToProps
)(TrainingInitializer);
