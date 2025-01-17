'use client';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '@/lib/hooks';
import { openFilter } from '@/lib/features/material/materialSlice';

export const SearchButton = () => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={() => {
        dispatch(openFilter());
      }}
    >
      <SearchIcon sx={{ color: 'common.white', fontSize: '2.4rem' }} />
    </IconButton>
  );
};
