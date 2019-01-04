import * as React from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { withFormik, Form, FormikHandlers, FormikState } from 'formik';
import { appTheme } from '@src/styles/theme';
// import SelectRangeFromTo from '@src/components/SelectRangeFromTo';
import SelectItem from '@src/components/SelectItem';
import AppButton from '@src/components/AppButton';
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
  RangeToConditions,
} from '@src/enums';
import { toColorConditionString, toKarutaStyleConditionString, toKimarijiConditionString } from '@src/utils';
import { GlobalState } from '@src/state';
import { ROUTE_PATHS } from '@src/constants';

export interface ConnectedProps {
  initialRangeFrom: RangeFromCondition;
  initialRangeTo: RangeToCondition;
  initialKimariji: KimarijiCondition;
  initialColor: ColorCondition;
  initialKamiNoKuStyle: KarutaStyleCondition;
  initialShimoNoKuStyle: KarutaStyleCondition;
}

export type Props = ConnectedProps;

export interface FormValues {
  rangeFrom: string;
  rangeTo: string;
  kimariji: string;
  color: string;
  kamiNoKuStyle: string;
  shimoNoKuStyle: string;
}

export type FormViewProps = FormikState<FormValues> & FormikHandlers;

const KimarijiConditionNameList = KimarijiConditions.values.map(v => toKimarijiConditionString(v));

const ColorConditionNameList = ColorConditions.values.map(v => toColorConditionString(v));

const KarutaStyleConditionNameList = KarutaStyleConditions.values.map(v => toKarutaStyleConditionString(v));

const FormView = ({ values, handleChange, handleSubmit }: FormViewProps) => (
  <Form>
    {/* <SelectRangeFromTo
      from={values.rangeFrom}
      to={values.rangeTo}
      fromTouched={touched.rangeFrom}
      toTouched={touched.rangeTo}
      error={errors.rangeFrom}
      handleChange={handleChange}
      style={{ marginBottom: appTheme.spacing2x }}
    /> */}
    <SelectItem
      title="決まり字"
      name="kimariji"
      value={values.kimariji}
      valueList={KimarijiConditions.values}
      nameList={KimarijiConditionNameList}
      handleChange={handleChange}
      style={{ marginBottom: appTheme.spacing2x }}
    />
    <SelectItem
      title="五色"
      name="color"
      value={values.color}
      valueList={ColorConditions.values}
      nameList={ColorConditionNameList}
      handleChange={handleChange}
      style={{ marginBottom: appTheme.spacing2x }}
    />
    <SelectItem
      title="上の句"
      name="kamiNoKuStyle"
      value={values.kamiNoKuStyle}
      valueList={KarutaStyleConditions.values}
      nameList={KarutaStyleConditionNameList}
      handleChange={handleChange}
      style={{ marginBottom: appTheme.spacing2x }}
    />
    <SelectItem
      title="下の句"
      name="shimoNoKuStyle"
      value={values.shimoNoKuStyle}
      valueList={KarutaStyleConditions.values}
      nameList={KarutaStyleConditionNameList}
      handleChange={handleChange}
      style={{ marginBottom: appTheme.spacing2x }}
    />
    <AppButton
      label="練習をはじめる"
      icon="edit"
      type="primary"
      onClick={handleSubmit}
      style={{ marginTop: appTheme.spacing4x }}
    />
  </Form>
);

const TrainingMenuForm = withFormik({
  handleSubmit: values => {
    navigate(ROUTE_PATHS.TRAINING_QUESTION, {
      state: {
        color: ColorConditions.valueOf(values.color),
        kamiNoKuStyle: KarutaStyleConditions.valueOf(Number(values.kamiNoKuStyle)),
        kimariji: KimarijiConditions.valueOf(Number(values.kimariji)),
        rangeFrom: RangeFromConditions.valueOf(Number(values.rangeFrom)),
        rangeTo: RangeToConditions.valueOf(Number(values.rangeTo)),
        shimoNoKuStyle: KarutaStyleConditions.valueOf(Number(values.shimoNoKuStyle)),
        submitTime: new Date().getTime(),
      },
    });
  },
  mapPropsToValues: (props: Props) => ({
    color: props.initialColor,
    kamiNoKuStyle: props.initialKamiNoKuStyle.toString(),
    kimariji: props.initialKimariji.toString(),
    rangeFrom: props.initialRangeFrom.toString(),
    rangeTo: props.initialRangeTo.toString(),
    shimoNoKuStyle: props.initialShimoNoKuStyle.toString(),
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

export const mapStateToProps = ({ questions }: GlobalState): ConnectedProps => {
  const { trainingCondition } = questions;
  return {
    initialColor: trainingCondition.color,
    initialKamiNoKuStyle: trainingCondition.kamiNoKuStyle,
    initialKimariji: trainingCondition.kimariji,
    initialRangeFrom: trainingCondition.rangeFrom,
    initialRangeTo: trainingCondition.rangeTo,
    initialShimoNoKuStyle: trainingCondition.shimoNoKuStyle,
  };
};

export default connect(mapStateToProps)(TrainingMenuForm);
