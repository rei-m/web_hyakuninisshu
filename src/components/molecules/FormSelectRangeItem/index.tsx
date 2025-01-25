import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FONT_SIZE } from '@/styles/constants';

export type FormSelectRangeItemProps = {
  title: string;
  from: {
    name: string;
    value: string;
    list: ReadonlyArray<{ value: string | number; text: string }>;
    onChange: (value: string) => void;
  };
  to: {
    name: string;
    value: string;
    list: ReadonlyArray<{ value: string | number; text: string }>;
    onChange: (value: string) => void;
  };
  error?: string;
};

const FormSelectRangeItem = ({ title, from, to, error }: FormSelectRangeItemProps) => (
  <Box>
    <Box sx={{ textAlign: 'left' }}>
      <Typography component={'span'} sx={{ fontSize: '1.05rem', color: '#182026' }}>
        {title}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Select
        variant="standard"
        value={from.value}
        onChange={(e) => {
          from.onChange(e.target.value);
        }}
        inputProps={{
          name: from.name,
          id: `id-${from.name}`,
        }}
        sx={{
          fontSize: FONT_SIZE.m,
          textAlign: 'left',
          maxWidth: 167,
          flexGrow: 1,
        }}
      >
        {from.list.map((item) => (
          <MenuItem
            value={item.value}
            sx={{
              fontSize: FONT_SIZE.m,
              textAlign: 'left',
              maxWidth: 167,
            }}
            key={`select_item_${item.value}`}
          >
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <Box component={'span'} sx={{ paddingLeft: 2, paddingRight: 2 }}>
        〜
      </Box>
      <Select
        variant="standard"
        value={to.value}
        onChange={(e) => {
          to.onChange(e.target.value);
        }}
        inputProps={{
          name: to.name,
          id: `id-${to.name}`,
        }}
        sx={{
          fontSize: FONT_SIZE.m,
          textAlign: 'left',
          maxWidth: 167,
          flexGrow: 1,
        }}
      >
        {to.list.map((item) => (
          <MenuItem
            value={item.value}
            sx={{
              fontSize: FONT_SIZE.m,
              textAlign: 'left',
              maxWidth: 167,
            }}
            key={`select_item_${item.value}`}
          >
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
    {error && <Box sx={{ textAlign: 'left', fontSize: FONT_SIZE.ss, color: '#f00', marginTop: 0.5 }}>{error}</Box>}
  </Box>
);

export default FormSelectRangeItem;
