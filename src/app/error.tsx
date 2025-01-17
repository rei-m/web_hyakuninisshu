'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }, [error]);

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
        予期せぬエラーが発生しました。時間をおいて再度お試しください。
      </Typography>
      <Image
        src={'/dogeza_businessman.png'}
        width={200}
        height={200}
        style={{ marginTop: '32px' }}
        alt={`エラーが起きました`}
      />
      <Button color="inherit" onClick={() => reset()} sx={{ mt: 2 }}>
        再表示
      </Button>
    </Box>
  );
}
