import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '../../reducers/index';
import TrainingMenuSection, {
  TrainingMenuSectionProps
} from '../../components/TrainingMenuSection';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  RangeFromCondition,
  RangeToCondition
} from '../../enums';

export type TrainingsConnectedProps = Omit<
  TrainingMenuSectionProps,
  'onSubmit'
>;

export type TrainingsDispatchProps = Pick<TrainingMenuSectionProps, 'onSubmit'>;

const mapStateToProps = ({
  questionsState
}: GlobalState): TrainingsConnectedProps => {
  const { trainingCondition } = questionsState;
  return {
    initialColor: trainingCondition.color,
    initialKamiNoKuStyle: trainingCondition.kamiNoKuStyle,
    initialKimariji: trainingCondition.kimariji,
    initialRangeFrom: trainingCondition.rangeFrom,
    initialRangeTo: trainingCondition.rangeTo,
    initialShimoNoKuStyle: trainingCondition.shimoNoKuStyle
  };
};

const mapDispatchToProps = (
  _: Dispatch<GlobalState>,
  { history }: RouteComponentProps<{}>
): TrainingsDispatchProps => {
  return {
    onSubmit: (
      rangeFrom: RangeFromCondition,
      rangeTo: RangeToCondition,
      kimariji: KimarijiCondition,
      color: ColorCondition,
      kamiNoKuStyle: KarutaStyleCondition,
      shimoNoKuStyle: KarutaStyleCondition,
      submitTime: number
    ) => {
      history.push('/training/question', {
        color,
        kamiNoKuStyle,
        kimariji,
        rangeFrom,
        rangeTo,
        shimoNoKuStyle,
        submitTime
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrainingMenuSection)
);
