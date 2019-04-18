import * as React from 'react';
import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';

export interface Props {
  title: string;
  name: string;
  value: string;
  list: Array<{ value: string | number; text: string }>;
  error?: string;
  style?: React.CSSProperties;
  handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

type StylesClassKey = 'formControl' | 'label' | 'select';

const styles: StyleRules<StylesClassKey> = {
  formControl: {
    display: 'flex',
  },
  label: {
    fontSize: appTheme.fontSizeS,
    color: '#182026',
  },
  select: {
    fontSize: appTheme.fontSizeM,
    textAlign: 'left',
  },
};

// const stylesProvider = () => styles;

const Error = styled.div`
  font-size: 1.2rem;
  color: #f00;
  margin: ${({ theme }) => `${theme.spacing1x} 0`};
`;

const SelectItem = withStyles<StylesClassKey>(styles)(
  ({
    title,
    name,
    value,
    list,
    error,
    classes,
    style,
    handleChange,
  }: Props & {
    classes: { [key in StylesClassKey]: string };
  }) => (
    <FormControl className={classes.formControl} style={style}>
      <InputLabel htmlFor={`id-${name}`} className={classes.label}>
        {title}
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{
          name,
          id: `id-${name}`,
        }}
        className={classes.select}
      >
        {list.map(item => (
          <MenuItem value={item.value} className={classes.select} key={`select_item_${item.value}`}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      {error && <Error>{error}</Error>}
    </FormControl>
  )
);

export default SelectItem;
