import { useContext } from 'react';
import { DiContainerContext } from '@src/presentation/contexts/DiContainerProvider';

export const useDiContainer = () => useContext(DiContainerContext);
