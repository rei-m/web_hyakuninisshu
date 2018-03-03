import * as React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { OptionItem } from '../../types';

export interface SelectItemProps {
  readonly title: string;
  readonly name: string;
  readonly value: string | number;
  readonly list: Array<OptionItem<string | number>>;
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
          {props.list.map((item, i) => (
            <option value={item.value} key={`select_item_${i}`}>
              {item.name}
            </option>
          ))}
        </Field>
      </SelectRange>
    </SelectRow>
  </Label>
);

export default SelectItem;
