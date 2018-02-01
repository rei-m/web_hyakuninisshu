import * as React from 'react';
import styled from 'styled-components';
import { RANGE_FROM, RANGE_TO } from '../../constants/Training';

const Label = styled.label`
  text-align: left;
`;

const SelectRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectRange = styled.div`
  width: 150px;
`;

const Separate = styled.span`
  padding: 16px;
`;

export interface SelectRangeFromToProps {
  fromValue: number;
  toValue: number;
}

const SelectRangeFromTo = (props: SelectRangeFromToProps) => (
  <Label className="pt-label">
    出題範囲
    <SelectRow>
      <SelectRange className="pt-select pt-large">
        <select>
          {RANGE_FROM.map((item, i) => (
            <option
              value={item.value}
              key={`range_from_${i}`}
              selected={item.value === props.fromValue}
            >
              {item.name}
            </option>
          ))}
        </select>
      </SelectRange>
      <Separate>〜</Separate>
      <SelectRange className="pt-select pt-large">
        <select>
          {RANGE_TO.map((item, i) => (
            <option
              value={item.value}
              key={`range_to_${i}`}
              selected={item.value === props.toValue}
            >
              {item.name}
            </option>
          ))}
        </select>
      </SelectRange>
    </SelectRow>
  </Label>
);

export default SelectRangeFromTo;
