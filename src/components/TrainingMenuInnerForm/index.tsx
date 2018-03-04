import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { Form, FormikHandlers, FormikState } from 'formik';
import {
  ColorConditions,
  KarutaStyleConditions,
  KimarijiConditions
} from '../../enums';
import SelectItem from './SelectItem';
import SelectRangeFromTo from './SelectRangeFromTo';
import {
  toColorConditionString,
  toKarutaStyleConditionString,
  toKimarijiConditionString
} from '../helper';

const StartButton = withAppTheme(styled.button)`
  margin-top: ${({ theme }) => theme.spacing4x};
`;

const KimarijiConditionNameList = KimarijiConditions.values.map(v =>
  toKimarijiConditionString(v)
);

const ColorConditionNameList = ColorConditions.values.map(v =>
  toColorConditionString(v)
);

const KarutaStyleConditionNameList = KarutaStyleConditions.values.map(v =>
  toKarutaStyleConditionString(v)
);

export interface TrainingMenuInnerFormValues {
  rangeFrom: string;
  rangeTo: string;
  kimariji: string;
  color: string;
  kamiNoKuStyle: string;
  shimoNoKuStyle: string;
}

export type TrainingMenuInnerFormProps = FormikState<
  TrainingMenuInnerFormValues
> &
  FormikHandlers;

const TrainingMenuInnerForm = ({
  values,
  handleChange,
  errors,
  touched
}: TrainingMenuInnerFormProps) => (
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
    <StartButton
      type="submit"
      className="pt-button pt-intent-primary pt-large pt-icon-edit"
    >
      練習をはじめる
    </StartButton>
  </Form>
);

export default TrainingMenuInnerForm;
