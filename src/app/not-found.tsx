'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FONT_SIZE } from '@/theme';

import dogezaImage from '@/assets/images/dogeza_businessman.png';

export default function NotFound() {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxSizing: 'border-box',
        height: '100vh',
      }}
    >
      <Typography sx={{ fontSize: FONT_SIZE.l }}>
        ページが見つかりませんでした。
        <br />
        トップページにお戻りください。
      </Typography>
      <Image src={dogezaImage} width={200} height={200} style={{ marginTop: '32px' }} alt={`エラーが起きました`} />
      <Button color="inherit" onClick={() => router.replace('/')} sx={{ mt: 2 }}>
        トップページに戻る
      </Button>
    </Box>
  );
}
