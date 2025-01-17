'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NotFound() {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fffff0',
        boxSizing: 'border-box',
        height: '100vh',
      }}
    >
      <Typography sx={{ fontSize: '1.8rem' }}>
        ページが見つかりませんでした。
        <br />
        トップページにお戻りください。{' '}
      </Typography>
      <Image
        src={'/dogeza_businessman.png'}
        width={200}
        height={200}
        style={{ marginTop: '32px' }}
        alt={`エラーが起きました`}
      />
      <Button color="inherit" onClick={() => router.replace('/')} sx={{ mt: 2 }}>
        トップページに戻る
      </Button>
    </Box>
  );
}
