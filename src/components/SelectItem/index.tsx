import * as React from 'react';
import { Field } from 'formik';
import styled from '@src/styles/styled-components';

export interface Props {
  title: string;
  name: string;
  value: string;
  valueList: Array<string | number>;
  nameList: string[];
  handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const Label = styled.label`
  text-align: left;
`;

const SelectRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing2x};
`;

const SelectRange = styled.div`
  width: 100%;
`;

const SelectItem: React.FC<Props> = ({ title, name, value, handleChange, valueList, nameList }) => (
  <Label className="bp3-label">
    {title}
    <SelectRow>
      <SelectRange className="bp3-select bp3-large">
        <Field component="select" name={name} value={value} onChange={handleChange}>
          {valueList.map((v, i) => (
            <option value={v} key={`select_item_${i}`}>
              {nameList[i]}
            </option>
          ))}
        </Field>
      </SelectRange>
    </SelectRow>
  </Label>
);

export default SelectItem;
