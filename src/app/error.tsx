'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FONT_SIZE } from '@/styles/constants';

import dogezaImage from '@/assets/images/dogeza_businessman.png';

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
        boxSizing: 'border-box',
        height: '100vh',
      }}
    >
      <Typography sx={{ fontSize: FONT_SIZE.l }}>
        予期せぬエラーが発生しました。時間をおいて再度お試しください。
      </Typography>
      <Image
        src={dogezaImage}
        width={200}
        height={200}
        style={{ marginTop: '32px' }}
        alt={`予期せぬエラーが発生しました。時間をおいて再度お試しください。`}
      />
      <Button color="inherit" onClick={() => reset()} sx={{ mt: 2 }}>
        再表示
      </Button>
    </Box>
  );
}
