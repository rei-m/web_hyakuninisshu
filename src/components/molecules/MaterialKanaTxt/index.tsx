import type { Karuta } from '@/domains/models';
import type { SxAppProps } from '@/styles/theme';

import Typography from '@mui/material/Typography';

export type MaterialKanaTxtProps = {
  karuta: Karuta;
  separate?: React.ReactNode;
  sx?: SxAppProps;
};

const MaterialKanaTxt = ({ karuta, separate = <br />, sx }: MaterialKanaTxtProps) => {
  const { kimariji, shoku, niku, sanku } = karuta;
  const modKimariji = shoku.kana.length - kimariji;
  return modKimariji >= 0 ? (
    <Typography component={'p'} sx={[{ textAlign: 'left' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography component={'span'} sx={{ color: '#ff0000' }}>
        {shoku.kana.slice(0, kimariji)}
      </Typography>
      {modKimariji > 0
        ? `${shoku.kana.slice(kimariji - shoku.kana.length)} ${niku.kana} ${sanku.kana}`
        : ` ${niku.kana} ${sanku.kana}`}
      {separate}
      {`${karuta.shiku.kana} ${karuta.kekku.kana}`}
    </Typography>
  ) : (
    <Typography component={'p'} sx={[{ textAlign: 'left' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography
        component={'span'}
        sx={{ color: '#ff0000' }}
      >{`${shoku.kana} ${niku.kana.slice(0, modKimariji * -1)}`}</Typography>
      {`${niku.kana.slice(modKimariji * -1)} ${sanku.kana}`}
      {separate}
      {`${karuta.shiku.kana} ${karuta.kekku.kana}`}
    </Typography>
  );
};

export default MaterialKanaTxt;
