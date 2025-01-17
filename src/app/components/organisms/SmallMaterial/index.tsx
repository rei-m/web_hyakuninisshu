import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { MaterialKanjiTxt } from '@/app/components/molecules/MaterialKanjiTxt';
import { KarutaImage } from '@/app/components/atoms/KarutaImage';
import { karutaNoToJPNText } from '@/domains/models/KarutaNo';
import { ROUTING } from '@/configs/routing';

import type { Karuta } from '@/domains/models';
import type { SxAppProps } from '@/theme';

export type SmallMaterialProps = {
  karuta: Karuta;
  image?: boolean;
  separate?: React.ReactNode;
  sx?: SxAppProps;
};

export const SmallMaterial = ({ karuta, image = true, separate = <br />, sx }: SmallMaterialProps) => (
  <Box
    component={Link}
    href={ROUTING.karutasShow(karuta.no)}
    scroll={true}
    sx={[
      {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'common.white',
        padding: 1,
        color: 'rgb(0, 0, 0)',
        textDecoration: 'none',
        ':hover': {
          backgroundColor: '#f5f5f5',
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {image && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginRight: 1,
        }}
      >
        <Typography sx={{ marginBottom: 0.5, fontSize: '1rem' }}>
          {karutaNoToJPNText({ karutaNo: karuta.no })}
        </Typography>
        <KarutaImage karuta={karuta} width={40} />
      </Box>
    )}
    <Box
      sx={{
        flexGrow: 1,
        textAlign: 'left',
        boxSizing: 'border-box',
      }}
    >
      {!image && <Typography sx={{ fontSize: '1rem' }}>{karutaNoToJPNText({ karutaNo: karuta.no })}</Typography>}
      <MaterialKanjiTxt karuta={karuta} separate={separate} sx={{ fontSize: '1.4rem' }} />
      <Typography
        component={`span`}
        sx={{
          display: 'inline-block',
          width: '100%',
          textAlign: 'right',
          paddingTop: 1,
        }}
      >
        {karuta.creator}
      </Typography>
    </Box>
  </Box>
);
