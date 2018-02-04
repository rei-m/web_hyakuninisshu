import * as React from 'react';
import styled from 'styled-components';
import { Form, FormikHandlers, FormikState } from 'formik';
import {
  COLOR_LIST,
  KIMARIJI_LIST,
  STYLE_LIST
} from '../../constants/Training';
import SelectItem from './SelectItem';
import SelectRangeFromTo from './SelectRangeFromTo';

const StartButton = styled.button`
  margin-top: 32px;
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
  touched
}: TrainingMenuInnerFormProps) => {
  console.dir(touched);
  return (
    <Form>
      <SelectRangeFromTo
        from={values.rangeFrom}
        to={values.rangeTo}
        handleChange={handleChange}
      />
      <SelectItem
        title="決まり字"
        name="kimariji"
        list={KIMARIJI_LIST}
        value={KIMARIJI_LIST[0].value}
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
        value={STYLE_LIST[0].value}
        handleChange={handleChange}
      />
      <SelectItem
        title="下の句"
        name="shimoNoKuStyle"
        list={STYLE_LIST}
        value={STYLE_LIST[1].value}
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
};

export default TrainingMenuInnerForm;
