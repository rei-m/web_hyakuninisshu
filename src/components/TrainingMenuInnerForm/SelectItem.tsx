import * as React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';

export interface SelectItemProps {
  readonly title: string;
  readonly name: string;
  readonly value: string;
  readonly valueList: Array<string | number>;
  readonly nameList: string[];
  readonly handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const Label = styled.label`
  text-align: left;
`;

const SelectRow = withAppTheme(styled.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing2x};
`;

const SelectRange = styled.div`
  width: 100%;
`;

const SelectItem = (props: SelectItemProps) => (
  <Label className="pt-label">
    {props.title}
    <SelectRow>
      <SelectRange className="pt-select pt-large">
        <Field
          component="select"
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        >
          {props.valueList.map((value, i) => (
            <option value={value} key={`select_item_${i}`}>
              {props.nameList[i]}
            </option>
          ))}
        </Field>
      </SelectRange>
    </SelectRow>
  </Label>
);

export default SelectItem;
