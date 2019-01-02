import * as React from 'react';
import { navigate } from 'gatsby';
import { withFormik, Form, FormikHandlers, FormikState } from 'formik';
import styled from '@src/styles/styled-components';
import SelectRangeFromTo from '@src/components/SelectRangeFromTo';
import SelectItem from '@src/components/SelectItem';
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
import { connect } from 'react-redux';

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

const StartButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing4x};
  background-color: ${({ theme }) => theme.colorAccent} !important;
  &:active {
    background-color: ${({ theme }) => theme.colorAccentActive} !important;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colorAccentHover} !important;
  }
`;

const KimarijiConditionNameList = KimarijiConditions.values.map(v => toKimarijiConditionString(v));

const ColorConditionNameList = ColorConditions.values.map(v => toColorConditionString(v));

const KarutaStyleConditionNameList = KarutaStyleConditions.values.map(v => toKarutaStyleConditionString(v));

const FormView = ({ values, handleChange, errors, touched }: FormViewProps) => (
  <Form>
    <SelectRangeFromTo
      from={values.rangeFrom}
      to={values.rangeTo}
      fromTouched={touched.rangeFrom}
      toTouched={touched.rangeTo}
      error={errors.rangeFrom}
      handleChange={handleChange}
    />
    <SelectItem
      title="決まり字"
      name="kimariji"
      value={values.kimariji}
      valueList={KimarijiConditions.values}
      nameList={KimarijiConditionNameList}
      handleChange={handleChange}
    />
    <SelectItem
      title="五色"
      name="color"
      value={values.color}
      valueList={ColorConditions.values}
      nameList={ColorConditionNameList}
      handleChange={handleChange}
    />
    <SelectItem
      title="上の句"
      name="kamiNoKuStyle"
      value={values.kamiNoKuStyle}
      valueList={KarutaStyleConditions.values}
      nameList={KarutaStyleConditionNameList}
      handleChange={handleChange}
    />
    <SelectItem
      title="下の句"
      name="shimoNoKuStyle"
      value={values.shimoNoKuStyle}
      valueList={KarutaStyleConditions.values}
      nameList={KarutaStyleConditionNameList}
      handleChange={handleChange}
    />
    <StartButton type="submit" className="bp3-button bp3-intent-primary bp3-large bp3-icon-edit">
      練習をはじめる
    </StartButton>
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
