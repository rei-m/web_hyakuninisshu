import * as React from 'react';
import { TextAlignProperty } from 'csstype';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import styled from '@src/styles/styled-components';
import { RangeFromConditions, RangeToConditions } from '@src/enums';
import { toKarutaNoString } from '@src/utils';

export interface Props {
  from: string;
  to: string;
  fromTouched?: boolean;
  toTouched?: boolean;
  error?: string;
  style?: React.CSSProperties;
  handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const styles = {
  formControl: {
    display: 'flex',
  },
  select: {
    fontSize: '1.6rem',
    maxWidth: '150px',
    flexGrow: 1,
    textAlign: 'left' as TextAlignProperty,
  },
};

const stylesProvider = () => styles;

type RenderProps = Props & {
  classes: {
    formControl: string;
    select: string;
  };
};

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  text-align: left;
  font-size: 1.1rem;
  color: #182026;
`;

const Separate = styled.span`
  padding: ${({ theme }) => theme.spacing2x};
`;

const Error = styled.div`
  font-size: 1.2rem;
  color: #f00;
  margin: ${({ theme }) => `${theme.spacing1x} 0`};
`;

const SelectRangeFromTo = withStyles(stylesProvider)(
  ({ from, to, error, handleChange, classes, style }: RenderProps) => (
    <FormControl className={classes.formControl} style={style}>
      <Label>出題範囲</Label>
      <FormRow>
        <Select
          value={from}
          onChange={handleChange}
          inputProps={{
            name: 'rangeFrom',
            id: `id-range-from`,
          }}
          className={classes.select}
        >
          {RangeFromConditions.values.map(value => (
            <MenuItem value={value} className={classes.select} key={`range_from_${value}`}>
              {toKarutaNoString(value)}
            </MenuItem>
          ))}
        </Select>
        <Separate>〜</Separate>
        <Select
          value={to}
          onChange={handleChange}
          inputProps={{
            name: 'rangeTo',
            id: `id-range-to`,
          }}
          className={classes.select}
        >
          {RangeToConditions.values.map(value => (
            <MenuItem value={value} className={classes.select} key={`range_to_${value}`}>
              {toKarutaNoString(value)}
            </MenuItem>
          ))}
        </Select>
      </FormRow>
      {error && <Error>{error}</Error>}
    </FormControl>
  )
);

export default SelectRangeFromTo;
