import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StoreProvider } from '../src/app/StoreProvider';
import { theme } from '../src/theme';

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StoreProvider>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  </StoreProvider>
);
