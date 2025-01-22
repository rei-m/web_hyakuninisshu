import type { Karuta } from '@/domains/models';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MaterialKanjiTxt from '@/app/components/molecules/MaterialKanjiTxt';
import MaterialKanaTxt from '@/app/components/molecules/MaterialKanaTxt';
import Article from '@/app/components/atoms/Article';
import Heading from '@/app/components/atoms/Heading';
import KarutaImage from '@/app/components/atoms/KarutaImage';

import { karutaNoToJPNText } from '@/domains/models/KarutaNo';

export type MaterialProps = {
  karuta: Karuta;
};

const Material = ({ karuta }: MaterialProps) => (
  <Article
    heading={
      <Heading level={3}>
        {karutaNoToJPNText({ karutaNo: karuta.no })} / {karuta.creator}
      </Heading>
    }
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'common.white',
      boxSizing: 'border-box',
      border: `8px solid`,
      borderColor: 'primary.main',
      borderRadius: 0.5,
      p: 2,
      maxWidth: 380,
      boxShadow: 1,
    }}
  >
    <Box sx={{ m: 1 }}>
      <KarutaImage karuta={karuta} width={200} height={280} />
    </Box>
    <Box sx={{ width: '100%', py: 1 }}>
      <Heading level={4} visualLevel={5} sx={{ textAlign: 'left' }}>
        原文
      </Heading>
      <MaterialKanjiTxt karuta={karuta} />
      <MaterialKanaTxt karuta={karuta} />
    </Box>
    <Box sx={{ width: '100%', py: 1 }}>
      <Heading level={4} visualLevel={5} sx={{ textAlign: 'left' }}>
        訳
      </Heading>
      <Typography sx={{ textAlign: 'left' }}>{karuta.translation}</Typography>
    </Box>
  </Article>
);

export default Material;
