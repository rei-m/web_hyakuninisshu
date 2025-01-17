import Typography from '@mui/material/Typography';

import type { Karuta } from '@/domains/models';
import type { SxAppProps } from '@/theme';

export type MaterialKanjiTxtProps = {
  karuta: Karuta;
  separate?: React.ReactNode;
  sx?: SxAppProps;
};

export const MaterialKanjiTxt = ({ karuta, separate = <br />, sx }: MaterialKanjiTxtProps) => (
  <Typography component={'p'} sx={[{ textAlign: 'left' }, ...(Array.isArray(sx) ? sx : [sx])]}>
    {`${karuta.shoku.kanji} ${karuta.niku.kanji} ${karuta.sanku.kanji}`}
    {separate}
    {`${karuta.shiku.kanji} ${karuta.kekku.kanji}`}
  </Typography>
);
