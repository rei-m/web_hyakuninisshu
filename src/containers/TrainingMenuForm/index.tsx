import { withFormik } from 'formik';
import {
  ColorCondition,
  ColorConditions,
  KarutaStyleCondition,
  KarutaStyleConditions,
  KimarijiCondition,
  KimarijiConditions,
  RangeFromCondition,
  RangeFromConditions,
  RangeToCondition,
  RangeToConditions
} from '@src/enums';
import TrainingMenuInnerForm, {
  TrainingMenuInnerFormValues
} from '@src/components/TrainingMenuInnerForm';

export interface TrainingMenuFormProps {
  readonly initialRangeFrom: RangeFromCondition;
  readonly initialRangeTo: RangeToCondition;
  readonly initialKimariji: KimarijiCondition;
  readonly initialColor: ColorCondition;
  readonly initialKamiNoKuStyle: KarutaStyleCondition;
  readonly initialShimoNoKuStyle: KarutaStyleCondition;
  readonly handleSubmit: (
    rangeFrom: RangeFromCondition,
    rangeTo: RangeToCondition,
    kimariji: KimarijiCondition,
    color: ColorCondition,
    kamiNoKuStyle: KarutaStyleCondition,
    shimoNoKuStyle: KarutaStyleCondition,
    submitTime: number
  ) => void;
}

const TrainingMenuForm = withFormik({
  handleSubmit: (values, { props }) => {
    props.handleSubmit(
      RangeFromConditions.valueOf(Number(values.rangeFrom)),
      RangeToConditions.valueOf(Number(values.rangeTo)),
      KimarijiConditions.valueOf(Number(values.kimariji)),
      ColorConditions.valueOf(values.color),
      KarutaStyleConditions.valueOf(Number(values.kamiNoKuStyle)),
      KarutaStyleConditions.valueOf(Number(values.shimoNoKuStyle)),
      new Date().getTime()
    );
  },
  mapPropsToValues: (props: TrainingMenuFormProps) => ({
    color: props.initialColor,
    kamiNoKuStyle: props.initialKamiNoKuStyle.toString(),
    kimariji: props.initialKimariji.toString(),
    rangeFrom: props.initialRangeFrom.toString(),
    rangeTo: props.initialRangeTo.toString(),
    shimoNoKuStyle: props.initialShimoNoKuStyle.toString()
  }),
  validate: (values, _) => {
    const errors: { [P in keyof TrainingMenuInnerFormValues]?: string } = {};
    const rangeFrom = Number(values.rangeFrom);
    const rangeTo = Number(values.rangeTo);
    if (rangeTo < rangeFrom) {
      errors.rangeFrom =
        '出題範囲の始まりは終わりより小さい数を指定してください';
      // rangeFromがエラーならToもエラーなのでメッセージは片方だけで良い
      // errors.rangeTo = '出題範囲の終わりは始まりより大きい数を指定してください';
    }
    return errors;
  }
})(TrainingMenuInnerForm);

export default TrainingMenuForm;
