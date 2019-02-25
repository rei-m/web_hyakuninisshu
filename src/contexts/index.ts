import * as React from 'react';
import staticQueries from '@src/hooks/staticQueries';

export type AppContextType = typeof staticQueries;

export const AppContext = React.createContext<AppContextType>(staticQueries);
