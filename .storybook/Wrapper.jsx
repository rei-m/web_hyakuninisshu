import React from 'react';

import typography from '@src/presentation/styles/typography';
typography.injectStyles()

import AppThemeProvider from '@src/presentation/contexts/AppThemeProvider';

// MUIが生成するClassNameの差分をなくす対応
// @see https://github.com/mui-org/material-ui/issues/9492#issuecomment-410443974
import { StylesProvider } from '@material-ui/styles';

const generateClassName = (rule, sheet) => {
  return `${sheet.options.classNamePrefix}-${rule.key}`;
};

export const Wrapper = ({ children }) => (
  <AppThemeProvider>
    {/* <StylesProvider generateClassName={generateClassName}> */}
      {children}
    {/* </StylesProvider> */}
  </AppThemeProvider>
);
