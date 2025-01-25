import type { Karuta } from '@/domains/models';
import type { SxAppProps } from '@/styles/theme';

import Typography from '@mui/material/Typography';

export type MaterialKanjiTxtProps = {
  karuta: Karuta;
  separate?: React.ReactNode;
  sx?: SxAppProps;
};

const MaterialKanjiTxt = ({ karuta, separate = <br />, sx }: MaterialKanjiTxtProps) => (
  <Typography component={'p'} sx={[{ textAlign: 'left' }, ...(Array.isArray(sx) ? sx : [sx])]}>
    {`${karuta.shoku.kanji} ${karuta.niku.kanji} ${karuta.sanku.kanji}`}
    {separate}
    {`${karuta.shiku.kanji} ${karuta.kekku.kanji}`}
  </Typography>
);

export default MaterialKanjiTxt;
