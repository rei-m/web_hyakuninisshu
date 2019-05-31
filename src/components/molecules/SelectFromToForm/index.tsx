import * as React from 'react';
import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import CenteredFrame from '@src/components/atoms/CenteredFrame';

export interface Props {
  title: string;
  from: {
    name: string;
    value: string;
    list: Array<{ value: string | number; text: string }>;
    touched?: boolean;
  };
  to: {
    name: string;
    value: string;
    list: Array<{ value: string | number; text: string }>;
    touched?: boolean;
  };
  error?: string;
  style?: React.CSSProperties;
  handleChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

type StylesClassKey = 'formControl' | 'select';

const styles: StyleRules<StylesClassKey> = {
  formControl: {
    display: 'flex',
  },
  select: {
    fontSize: appTheme.fontSizeM,
    flexGrow: 1,
    textAlign: 'left',
  },
};

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

const SelectRangeFromTo = withStyles<StylesClassKey>(styles)(
  ({
    title,
    from,
    to,
    error,
    classes,
    style,
    handleChange,
  }: Props & {
    classes: { [key in StylesClassKey]: string };
  }) => (
    <FormControl className={classes.formControl} style={style}>
      <Label>{title}</Label>
      <CenteredFrame tag={`div`}>
        <Select
          value={from.value}
          onChange={handleChange}
          inputProps={{
            name: from.name,
            id: `id-${from.name}`,
          }}
          className={classes.select}
        >
          {from.list.map(({ value, text }) => (
            <MenuItem value={value} className={classes.select} key={`range_from_${value}`}>
              {text}
            </MenuItem>
          ))}
        </Select>
        <Separate>〜</Separate>
        <Select
          value={to.value}
          onChange={handleChange}
          inputProps={{
            name: to.name,
            id: `id-${to.name}`,
          }}
          className={classes.select}
        >
          {to.list.map(({ value, text }) => (
            <MenuItem value={value} className={classes.select} key={`range_to_${value}`}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </CenteredFrame>
      {error && <Error>{error}</Error>}
    </FormControl>
  )
);

export default SelectRangeFromTo;
