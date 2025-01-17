import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export type FormSelectItemProps = {
  title: string;
  name: string;
  value: string;
  list: ReadonlyArray<{ value: string | number; text: string }>;
  onChange: (value: string) => void;
};

export const FormSelectItem = ({ title, name, value, list, onChange }: FormSelectItemProps) => (
  <FormControl variant="standard" sx={{ display: 'flex' }}>
    <InputLabel htmlFor={`id-${name}`} sx={{ color: '#182026', fontSize: '1.4rem' }}>
      {title}
    </InputLabel>
    <Select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      inputProps={{
        name,
        id: `id-${name}`,
      }}
      sx={{
        fontSize: '1.6rem',
        textAlign: 'left',
      }}
    >
      {list.map((item) => (
        <MenuItem
          value={item.value}
          sx={{
            fontSize: '1.6rem',
            textAlign: 'left',
          }}
          key={`select_item_${item.value}`}
        >
          {item.text}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
