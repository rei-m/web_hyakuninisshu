import { useContext } from 'react';
import { AppContext, AppContextType } from '@src/contexts';

export const useAppContext = (): AppContextType => useContext(AppContext);
