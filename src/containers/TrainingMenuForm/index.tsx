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
}

const TrainingMenuForm = withFormik({
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    console.dir(values);
    console.dir(props);
    console.dir(setSubmitting);
    console.dir(setErrors);
  },
  mapPropsToValues: (props: TrainingMenuFormProps) => ({
    color: props.initialColor,
    kamiNoKuStyle: props.initialKamiNoKuStyle.toString(),
    kimariji: props.initialKimariji.toString(),
    rangeFrom: props.initialRangeFrom.toString(),
    rangeTo: props.initialRangeTo.toString(),
    shimoNoKuStyle: props.initialShimoNoKuStyle.toString()
  }),
  validate: (values, props) => {
    const errors: { [P in keyof TrainingMenuInnerFormValues]?: string } = {};
    console.dir(values);
    console.dir(props);
    // if (!values.email) {
    //   errors.email = 'Required';[P in keyof TrainingMenuInnerFormValues]?: TrainingMenuInnerFormValues[P]
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = 'Invalid email address';
    // }
    errors.rangeFrom = 'Invalid';
    return errors;
  }
})(TrainingMenuInnerForm);

export default TrainingMenuForm;
