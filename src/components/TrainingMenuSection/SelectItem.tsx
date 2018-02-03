import * as React from 'react';
import styled from 'styled-components';
import { OptionItem } from '../../types';

const Label = styled.label`
  text-align: left;
`;

const SelectRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const SelectRange = styled.div`
  width: 100%;
`;

export interface SelectItemProps {
  readonly title: string;
  readonly value: string | number;
  readonly list: Array<OptionItem<string | number>>;
  readonly onChange: (value: string) => void;
}

const onChange = (props: SelectItemProps) => {
  return (e: React.SyntheticEvent<HTMLSelectElement>) => {
    props.onChange(e.currentTarget.value);
  };
};

const SelectItem = (props: SelectItemProps) => (
  <Label className="pt-label">
    {props.title}
    <SelectRow>
      <SelectRange className="pt-select pt-large">
        <select value={props.value as any} onChange={onChange(props)}>
          {props.list.map((item, i) => (
            <option value={item.value as any} key={`select_item_${i}`}>
              {item.name}
            </option>
          ))}
        </select>
      </SelectRange>
    </SelectRow>
  </Label>
);

export default SelectItem;
