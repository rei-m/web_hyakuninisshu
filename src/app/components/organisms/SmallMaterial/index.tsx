import type { Karuta } from '@/domains/models';
import { FONT_SIZE, type SxAppProps } from '@/theme';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MaterialKanjiTxt from '@/app/components/molecules/MaterialKanjiTxt';
import KarutaImage from '@/app/components/atoms/KarutaImage';

import { karutaNoToJPNText } from '@/domains/models/KarutaNo';
import { ROUTING } from '@/configs/routing';

export type SmallMaterialProps = {
  karuta: Karuta;
  image?: boolean;
  separate?: React.ReactNode;
  sx?: SxAppProps;
};

const SmallMaterial = ({ karuta, image = true, separate = <br />, sx }: SmallMaterialProps) => (
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
        <Typography sx={{ mb: 0.5, fontSize: FONT_SIZE.sss }}>{karutaNoToJPNText({ karutaNo: karuta.no })}</Typography>
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
      {!image && <Typography sx={{ fontSize: FONT_SIZE.sss }}>{karutaNoToJPNText({ karutaNo: karuta.no })}</Typography>}
      <MaterialKanjiTxt karuta={karuta} separate={separate} sx={{ fontSize: FONT_SIZE.s }} />
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

export default SmallMaterial;
