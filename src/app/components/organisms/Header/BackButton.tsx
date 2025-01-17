'use client';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export type BackButtonProps = {
  backUrl: string;
};

export const BackButton = ({ backUrl }: BackButtonProps) => {
  const router = useRouter();
  return (
    <IconButton
      onClick={() => {
        router.replace(backUrl, { scroll: true });
      }}
      size="large"
      edge="start"
      color="inherit"
      aria-label="back"
      sx={{ mr: 2 }}
    >
      <ArrowBackIcon sx={{ color: 'common.white', fontSize: '2.4rem' }} />
    </IconButton>
  );
};
