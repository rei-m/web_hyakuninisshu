import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { Form, FormikHandlers, FormikState } from 'formik';
import {
  COLOR_LIST,
  KIMARIJI_LIST,
  STYLE_LIST
} from '../../constants/trainings';
import SelectItem from './SelectItem';
import SelectRangeFromTo from './SelectRangeFromTo';

const StartButton = withAppTheme(styled.button)`
  margin-top: ${({ theme }) => theme.spacing4x};
`;

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
      list={KIMARIJI_LIST}
      value={values.kimariji}
      handleChange={handleChange}
    />
    <SelectItem
      title="五色"
      name="color"
      list={COLOR_LIST}
      value={values.color}
      handleChange={handleChange}
    />
    <SelectItem
      title="上の句"
      name="kamiNoKuStyle"
      list={STYLE_LIST}
      value={values.kamiNoKuStyle}
      handleChange={handleChange}
    />
    <SelectItem
      title="下の句"
      name="shimoNoKuStyle"
      list={STYLE_LIST}
      value={values.shimoNoKuStyle}
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
