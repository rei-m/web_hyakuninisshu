'use client';

import TrainingMenuFormView from '@/components/organisms/TrainingMenuFormView';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectCondition, startTraining } from '@/lib/features/question/questionSlice';
import { useTrainingMenuForm } from '@/hooks/useTrainingMenuForm';

const TrainingMenuForm = () => {
  const dispatch = useAppDispatch();
  const trainingCondition = useAppSelector(selectCondition);

  const { value, errors, setters } = useTrainingMenuForm(trainingCondition);

  return (
    <TrainingMenuFormView
      value={value}
      errors={errors}
      setters={setters}
      emptyError={trainingCondition.emptyError}
      onSubmit={() => {
        if (errors.range) {
          window.alert('出題条件でエラーがあります。確認してください。');
          return;
        }
        dispatch(startTraining({ condition: value }));
      }}
    />
  );
};

export default TrainingMenuForm;
