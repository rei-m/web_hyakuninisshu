import type { Color, Kimariji } from '@/domains/models';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { kimarijiToJPNText } from '@/domains/models/Kimariji';
import { colorToJPNText } from '@/domains/models/Color';

import { FONT_SIZE } from '@/theme';

export type MaterialListFilterViewProps = {
  isOpened: boolean;
  colorList: ReadonlyArray<{ color: Color; checked: boolean }>;
  kimarijiList: ReadonlyArray<{ kimariji: Kimariji; checked: boolean }>;
  onChangeColor: (color: Color, checked: boolean) => void;
  onChangeKimariji: (kimariji: Kimariji, checked: boolean) => void;
  onClickClose: () => void;
};

const MaterialListFilterView = ({
  isOpened,
  colorList,
  kimarijiList,
  onChangeColor,
  onChangeKimariji,
  onClickClose,
}: MaterialListFilterViewProps) => (
  <Backdrop open={isOpened} onClick={onClickClose} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
    <Box
      sx={{
        backgroundColor: 'background.default',
        width: 200,
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'common.black',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          height: 48,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid #808080',
        }}
      >
        <Typography component={'span'}>絞り込み</Typography>
        <IconButton onClick={onClickClose} sx={{ position: 'absolute', top: 4, right: 4 }}>
          <CloseIcon sx={{ color: 'common.black', fontSize: FONT_SIZE.ll }} />
        </IconButton>
      </Box>
      <Typography component={'div'} sx={{ textAlign: 'center', p: 1 }}>
        決まり字
      </Typography>
      <FormGroup>
        {kimarijiList.map(({ kimariji, checked }) => (
          <FormControlLabel
            key={kimariji}
            control={<Checkbox color="secondary" checked={checked} />}
            label={kimarijiToJPNText({ kimariji })}
            onChange={(_e, checked) => {
              onChangeKimariji(kimariji, checked);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{
              px: 1,
              m: 0,
              ':hover': {
                backgroundColor: '#00000010',
              },
            }}
          />
        ))}
      </FormGroup>
      <Typography component={'div'} sx={{ textAlign: 'center', p: 1, borderTop: '1px solid #808080' }}>
        色
      </Typography>
      <FormGroup>
        {colorList.map(({ color, checked }) => (
          <FormControlLabel
            key={color}
            control={<Checkbox color="secondary" checked={checked} />}
            label={colorToJPNText({ color })}
            onChange={(_e, checked) => {
              onChangeColor(color, checked);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{
              px: 1,
              m: 0,
              ':hover': {
                backgroundColor: '#00000010',
              },
            }}
          />
        ))}
      </FormGroup>
    </Box>
  </Backdrop>
);

export default MaterialListFilterView;
