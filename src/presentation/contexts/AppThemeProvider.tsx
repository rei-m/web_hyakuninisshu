import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { theme } from '@src/presentation/styles/theme';

const AppThemeProvider: React.FC<{}> = ({ children }) => <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;

export default AppThemeProvider;
