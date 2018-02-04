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
  readonly from: string;
  readonly to: string;
  readonly handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const SelectRangeFromTo = ({
  from,
  to,
  handleChange
}: SelectRangeFromToProps) => (
  <Label className="pt-label">
    出題範囲
    <SelectRow>
      <SelectRange className="pt-select pt-large">
        <select name="rangeFrom" value={from} onChange={handleChange}>
          {RANGE_FROM.map((item, i) => (
            <option value={item.value} key={`range_from_${i}`}>
              {item.name}
            </option>
          ))}
        </select>
      </SelectRange>
      <Separate>〜</Separate>
      <SelectRange className="pt-select pt-large">
        <select name="rangeTo" value={to} onChange={handleChange}>
          {RANGE_TO.map((item, i) => (
            <option value={item.value} key={`range_to_${i}`}>
              {item.name}
            </option>
          ))}
        </select>
      </SelectRange>
    </SelectRow>
  </Label>
);

export default SelectRangeFromTo;
