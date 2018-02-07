import { withFormik } from 'formik';
import TrainingMenuInnerForm, {
  TrainingMenuInnerFormValues
} from '../../components/TrainingMenuInnerForm';

export interface TrainingMenuFormProps {
  readonly initialRangeFrom: number;
  readonly initialRangeTo: number;
  readonly initialKimariji: number;
  readonly initialColor: string;
  readonly initialKamiNoKuStyle: number;
  readonly initialShimoNoKuStyle: number;
  readonly handleSubmit: (
    rangeFrom: number,
    rangeTo: number,
    kimariji: number,
    color: string,
    kamiNoKuStyle: number,
    shimoNoKuStyle: number
  ) => void;
}

const TrainingMenuForm = withFormik({
  handleSubmit: (values, { props }) => {
    props.handleSubmit(
      Number(values.rangeFrom),
      Number(values.rangeTo),
      Number(values.kimariji),
      values.color,
      Number(values.kamiNoKuStyle),
      Number(values.shimoNoKuStyle)
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
