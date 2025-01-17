import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { FormSelectItem } from '@/app/components/molecules/FormSelectItem';
import { FormSelectRangeItem } from '@/app/components/molecules/FormSelectRangeItem';

import { useTrainingMenuForm } from '@/hooks/useTrainingMenuForm';
import { karutaNoToJPNText } from '@/domains/models/KarutaNo';
import { kimarijiToJPNText } from '@/domains/models/Kimariji';
import { colorToJPNText } from '@/domains/models/Color';
import {
  ANIM_LIST,
  COLOR_LIST,
  DISPLAY_STYLE_LIST,
  KIMARIJI_LIST,
  RANGE_FROM_LIST,
  RANGE_TO_LIST,
} from '@/domains/models/TrainingCondition';

import type {
  KarutaNo,
  TrainingConditionAnim,
  TrainingConditionColor,
  TrainingConditionDisplayStyle,
  TrainingConditionKimariji,
  TrainingConditionRangeFrom,
  TrainingConditionRangeTo,
} from '@/domains/models';

export type TrainingMenuFormViewProps = {
  emptyError?: string;
  onSubmit: () => void;
} & ReturnType<typeof useTrainingMenuForm>;

const RANGE_FROM_KEY_VALUE_LIST = RANGE_FROM_LIST.map((value) => ({
  value: String(value),
  text: karutaNoToJPNText({ karutaNo: value as KarutaNo }),
}));

const RANGE_TO_KEY_VALUE_LIST = RANGE_TO_LIST.map((value) => ({
  value: String(value),
  text: karutaNoToJPNText({ karutaNo: value as KarutaNo }),
}));

const KIMARIJI_KEY_VALUE_LIST = KIMARIJI_LIST.map((value) => ({
  value: value === null ? 'none' : String(value),
  text: value === null ? '指定しない' : kimarijiToJPNText({ kimariji: value }),
}));

const COLOR_KEY_VALUE_LIST = COLOR_LIST.map((value) => ({
  value: value === null ? 'none' : value,
  text: value === null ? '指定しない' : colorToJPNText({ color: value }),
}));

const KARUTA_STYLE_KEY_VALUE_LIST = DISPLAY_STYLE_LIST.map((value) => ({
  value,
  text: value === 'kana' ? 'すべて仮名で表示' : '漢字と仮名で表示',
}));

const QUESTION_ANIM_KEY_VALUE_LIST = ANIM_LIST.map((value) => ({
  value,
  text: value === 'none' ? 'なし' : value === 'slow' ? 'おそめ' : value === 'normal' ? 'ふつう' : 'はやめ',
}));

export const TrainingMenuFormView = ({ value, errors, setters, emptyError, onSubmit }: TrainingMenuFormViewProps) => (
  <Box
    component={'form'}
    sx={{
      maxWidth: 380,
      margin: 'auto',
      '& > *:nth-of-type(n+2)': {
        marginTop: 2,
      },
    }}
  >
    {emptyError && (
      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: 'error.main', fontSize: '1.6rem' }}>{emptyError}</Typography>
      </Box>
    )}
    <FormSelectRangeItem
      title={`出題範囲`}
      from={{
        name: `rangeFrom`,
        value: String(value.rangeFrom),
        list: RANGE_FROM_KEY_VALUE_LIST,
        onChange: (value) => {
          setters.rangeFrom(Number(value) as TrainingConditionRangeFrom);
        },
      }}
      to={{
        name: `rangeTo`,
        value: String(value.rangeTo),
        list: RANGE_TO_KEY_VALUE_LIST,
        onChange: (value) => {
          setters.rangeTo(Number(value) as TrainingConditionRangeTo);
        },
      }}
      error={errors.range}
    />
    <FormSelectItem
      title={`決まり字`}
      name={`kimariji`}
      list={KIMARIJI_KEY_VALUE_LIST}
      value={value.kimariji === null ? 'none' : String(value.kimariji)}
      onChange={(value) => {
        setters.kimariji(value === 'none' ? null : (Number(value) as TrainingConditionKimariji));
      }}
    />
    <FormSelectItem
      title={`五色`}
      name={`color`}
      list={COLOR_KEY_VALUE_LIST}
      value={value.color === null ? 'none' : value.color}
      onChange={(value) => {
        setters.color(value === 'none' ? null : (value as TrainingConditionColor));
      }}
    />
    <FormSelectItem
      title={`上の句`}
      name={`kamiNoKuStyle`}
      list={KARUTA_STYLE_KEY_VALUE_LIST}
      value={value.kamiNoKuStyle}
      onChange={(value) => {
        setters.kamiNoKuStyle(value as TrainingConditionDisplayStyle);
      }}
    />
    <FormSelectItem
      title={`下の句`}
      name={`shimoNoKuStyle`}
      list={KARUTA_STYLE_KEY_VALUE_LIST}
      value={value.shimoNoKuStyle}
      onChange={(value) => {
        setters.shimoNoKuStyle(value as TrainingConditionDisplayStyle);
      }}
    />
    <FormSelectItem
      title={`読み札のアニメーション表示`}
      name={`questionAnim`}
      list={QUESTION_ANIM_KEY_VALUE_LIST}
      value={value.questionAnim}
      onChange={(value) => {
        setters.questionAnim(value as TrainingConditionAnim);
      }}
    />
    <Box sx={{ paddingTop: 2 }}>
      <Button color="secondary" variant="contained" startIcon={<EditIcon />} onClick={onSubmit} sx={{ boxShadow: 1 }}>
        練習をはじめる
      </Button>
    </Box>
  </Box>
);
