import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { withFormik, Form, FormikHandlers, FormikState } from 'formik';
import SelectFromToForm from '@src/components/molecules/SelectFromToForm';
import SelectForm from '@src/components/molecules/SelectForm';
import { EditButton } from '@src/components/molecules/IconLabelButton';
import {
  ColorCondition,
  ColorConditions,
  KarutaStyleCondition,
  KarutaStyleConditions,
  KimarijiCondition,
  KimarijiConditions,
  QuestionAnimCondition,
  QuestionAnimConditions,
  RangeFromCondition,
  RangeFromConditions,
  RangeToCondition,
  RangeToConditions,
} from '@src/enums';
import {
  toColorConditionString,
  toKarutaNoString,
  toKarutaStyleConditionString,
  toKimarijiConditionString,
  toQuestionAnimConditionString,
} from '@src/utils';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { ThemeInterface } from '@src/styles/theme';

export type OwnProps = {
  onSubmit: (
    rangeFrom: RangeFromCondition,
    rangeTo: RangeToCondition,
    kimariji: KimarijiCondition,
    color: ColorCondition,
    kamiNoKuStyle: KarutaStyleCondition,
    shimoNoKuStyle: KarutaStyleCondition,
    questionAnim: QuestionAnimCondition
  ) => void;
};

export type ConnectedProps = {
  initialRangeFrom: RangeFromCondition;
  initialRangeTo: RangeToCondition;
  initialKimariji: KimarijiCondition;
  initialColor: ColorCondition;
  initialKamiNoKuStyle: KarutaStyleCondition;
  initialShimoNoKuStyle: KarutaStyleCondition;
  initialQuestionAnim: QuestionAnimCondition;
};

export type PresenterProps = OwnProps & ConnectedProps;

export type ContainerProps = OwnProps & {
  Presenter: React.ComponentType<PresenterProps>;
};

export type FormValues = {
  rangeFrom: string;
  rangeTo: string;
  kimariji: string;
  color: string;
  kamiNoKuStyle: string;
  shimoNoKuStyle: string;
  questionAnim: string;
};

export type FormViewProps = FormikState<FormValues> & FormikHandlers;

const useStyles = makeStyles<ThemeInterface>(theme => ({
  form: {
    maxWidth: 380,
  },
  startTrainingButton: {
    marginTop: theme.spacing(2),
    boxShadow: theme.elevationShadow1x,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));

const rangeFromConditionKeyValueList = RangeFromConditions.values.map(value => ({
  value,
  text: toKarutaNoString(value),
}));

const rangeToConditionKeyValueList = RangeToConditions.values.map(value => ({
  value,
  text: toKarutaNoString(value),
}));

const kimarijiConditionKeyValueList = KimarijiConditions.values.map(value => ({
  value,
  text: toKimarijiConditionString(value),
}));

const colorConditionKeyValueList = ColorConditions.values.map(value => ({
  value,
  text: toColorConditionString(value),
}));

const karutaStyleConditionKeyValueList = KarutaStyleConditions.values.map(value => ({
  value,
  text: toKarutaStyleConditionString(value),
}));

const questionAnimConditionKeyValueList = QuestionAnimConditions.values.map(value => ({
  value,
  text: toQuestionAnimConditionString(value),
}));

export const FormView = ({ values, handleChange, handleSubmit, errors, touched }: FormViewProps) => {
  const classes = useStyles();
  return (
    <Form className={classes.form}>
      <SelectFromToForm
        title={`出題範囲`}
        from={{
          name: `rangeFrom`,
          value: values.rangeFrom,
          list: rangeFromConditionKeyValueList,
          touched: touched.rangeFrom,
        }}
        to={{
          name: `rangeTo`,
          value: values.rangeTo,
          list: rangeToConditionKeyValueList,
          touched: touched.rangeTo,
        }}
        error={errors.rangeFrom}
        handleChange={handleChange}
        className={classes.field}
      />
      <SelectForm
        title={`決まり字`}
        name={`kimariji`}
        list={kimarijiConditionKeyValueList}
        value={values.kimariji}
        handleChange={handleChange}
        className={classes.field}
      />
      <SelectForm
        title={`五色`}
        name={`color`}
        list={colorConditionKeyValueList}
        value={values.color}
        handleChange={handleChange}
        className={classes.field}
      />
      <SelectForm
        title={`上の句`}
        name={`kamiNoKuStyle`}
        list={karutaStyleConditionKeyValueList}
        value={values.kamiNoKuStyle}
        handleChange={handleChange}
        className={classes.field}
      />
      <SelectForm
        title={`下の句`}
        name={`shimoNoKuStyle`}
        list={karutaStyleConditionKeyValueList}
        value={values.shimoNoKuStyle}
        handleChange={handleChange}
        className={classes.field}
      />
      <SelectForm
        title={`読み札のアニメーション表示`}
        name={`questionAnim`}
        list={questionAnimConditionKeyValueList}
        value={values.questionAnim}
        handleChange={handleChange}
        className={classes.field}
      />
      <EditButton type={`accent`} onClick={handleSubmit} className={classes.startTrainingButton}>
        練習をはじめる
      </EditButton>
    </Form>
  );
};

export const TrainingMenuFormPresenter = withFormik({
  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(
      RangeFromConditions.valueOf(Number(values.rangeFrom)),
      RangeToConditions.valueOf(Number(values.rangeTo)),
      KimarijiConditions.valueOf(Number(values.kimariji)),
      ColorConditions.valueOf(values.color),
      KarutaStyleConditions.valueOf(Number(values.kamiNoKuStyle)),
      KarutaStyleConditions.valueOf(Number(values.shimoNoKuStyle)),
      QuestionAnimConditions.valueOf(Number(values.questionAnim))
    );
  },
  mapPropsToValues: (props: PresenterProps) => ({
    color: props.initialColor,
    kamiNoKuStyle: props.initialKamiNoKuStyle.toString(),
    kimariji: props.initialKimariji.toString(),
    rangeFrom: props.initialRangeFrom.toString(),
    rangeTo: props.initialRangeTo.toString(),
    shimoNoKuStyle: props.initialShimoNoKuStyle.toString(),
    questionAnim: props.initialQuestionAnim.toString(),
  }),
  validate: (values, _) => {
    const errors: { [P in keyof FormValues]?: string } = {};
    const rangeFrom = Number(values.rangeFrom);
    const rangeTo = Number(values.rangeTo);
    if (rangeTo < rangeFrom) {
      errors.rangeFrom = '出題範囲の始まりは終わりより小さい数を指定してください';
      // rangeFromがエラーならToもエラーなのでメッセージは片方だけで良い
      // errors.rangeTo = '出題範囲の終わりは始まりより大きい数を指定してください';
    }
    return errors;
  },
})(FormView);

export const TrainingMenuFormContainer = ({ onSubmit, Presenter }: ContainerProps) => {
  const { trainingCondition } = useSelector<GlobalState, questionsTypes.State>(state => state.questions);
  return (
    <Presenter
      initialColor={trainingCondition.color}
      initialKamiNoKuStyle={trainingCondition.kamiNoKuStyle}
      initialKimariji={trainingCondition.kimariji}
      initialRangeFrom={trainingCondition.rangeFrom}
      initialRangeTo={trainingCondition.rangeTo}
      initialShimoNoKuStyle={trainingCondition.shimoNoKuStyle}
      initialQuestionAnim={trainingCondition.questionAnim}
      onSubmit={onSubmit}
    />
  );
};

export const TrainingMenuForm = (props: OwnProps) => (
  <TrainingMenuFormContainer {...props} Presenter={TrainingMenuFormPresenter} />
);

export default TrainingMenuForm;
