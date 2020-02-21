import { useContext } from 'react';
import { QuestionDiContainerContext } from '@src/presentation/contexts/QuestionDiContainerProvider';

export const useQuestionDiContainer = () => useContext(QuestionDiContainerContext);
