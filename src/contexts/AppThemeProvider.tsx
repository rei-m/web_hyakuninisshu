import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from '@src/styles/styled-components';
import { theme } from '@src/styles/theme';

const AppThemeProvider: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </ThemeProvider>
);

export default AppThemeProvider;
