import * as React from 'react';
import { TextAlignProperty } from 'csstype';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export interface Props {
  title: string;
  name: string;
  value: string;
  valueList: Array<string | number>;
  nameList: string[];
  style?: React.CSSProperties;
  handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const styles = {
  formControl: {
    display: 'flex',
  },
  label: {
    fontSize: '1.4rem',
    color: '#182026',
  },
  select: {
    fontSize: '1.6rem',
    textAlign: 'left' as TextAlignProperty,
  },
};

const stylesProvider = () => styles;

type RenderProps = Props & {
  classes: {
    formControl: string;
    label: string;
    select: string;
  };
};

const SelectItem = withStyles(stylesProvider)(
  ({ title, name, value, handleChange, valueList, nameList, classes, style }: RenderProps) => (
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
        {valueList.map((v, i) => (
          <MenuItem value={v} className={classes.select} key={`select_item_${v}`}>
            {nameList[i]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
);

export default SelectItem;
