import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SelectFromToForm from '@src/presentation/components/molecules/SelectFromToForm';
import SelectForm from '@src/presentation/components/molecules/SelectForm';
import { EditButton } from '@src/presentation/components/molecules/IconLabelButton';
import { GlobalState } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { useForm, Values, Errors, Setters } from '@src/presentation/hooks/training-menu-form/useForm';
import { KarutaNo, Kimariji, Color } from '@src/domain/models';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  onSubmit: (
    rangeFrom: questionsTypes.RangeFromCondition,
    rangeTo: questionsTypes.RangeToCondition,
    kimariji: questionsTypes.KimarijiCondition,
    color: questionsTypes.ColorCondition,
    kamiNoKuStyle: questionsTypes.KarutaStyleCondition,
    shimoNoKuStyle: questionsTypes.KarutaStyleCondition,
    questionAnim: questionsTypes.QuestionAnimCondition
  ) => void;
};

export type PresenterProps = {
  values: Values;
  errors: Errors;
  setters: Setters;
  onChangeRange: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void;
  onChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void;
  onSubmit: () => void;
};

export type ContainerProps = Props & {
  presenter: React.ComponentType<PresenterProps>;
};

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  form: {
    maxWidth: 380,
  },
  startTrainingButton: {
    marginTop: theme.spacing(2),
    boxShadow: theme.elevationShadow1x,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));

const RANGE_FROM_KEY_VALUE_LIST = questionsTypes.RangeFromCondition.values.map((value) => ({
  value: String(value),
  text: KarutaNo.toJPNString(value),
}));

const RANGE_TO_KEY_VALUE_LIST = questionsTypes.RangeToCondition.values.map((value) => ({
  value: String(value),
  text: KarutaNo.toJPNString(value),
}));

const KIMARIJI_KEY_VALUE_LIST = questionsTypes.KimarijiCondition.values.map((value) => ({
  value: value === null ? 'none' : String(value),
  text: value === null ? '指定しない' : Kimariji.toJPNString(value),
}));

const COLOR_KEY_VALUE_LIST = questionsTypes.ColorCondition.values.map((value) => ({
  value: value === null ? 'none' : value,
  text: value === null ? '指定しない' : Color.toJPNString(value),
}));

const KARUTA_STYLE_KEY_VALUE_LIST = questionsTypes.KarutaStyleCondition.values.map((value) => ({
  value,
  text: value === 'kana' ? 'すべて仮名で表示' : '漢字と仮名で表示',
}));

const QUESTION_ANIM_KEY_VALUE_LIST = questionsTypes.QuestionAnimCondition.values.map((value) => ({
  value,
  text: value === 'none' ? 'なし' : value === 'slow' ? 'おそめ' : value === 'normal' ? 'ふつう' : 'はやめ',
}));

export const TrainingMenuFormPresenter = ({ values, errors, onChangeRange, onChange, onSubmit }: PresenterProps) => {
  const classes = useStyles();
  return (
    <form className={classes.form}>
      <SelectFromToForm
        title={`出題範囲`}
        from={{
          name: `rangeFrom`,
          value: String(values.range.from),
          list: RANGE_FROM_KEY_VALUE_LIST,
        }}
        to={{
          name: `rangeTo`,
          value: String(values.range.to),
          list: RANGE_TO_KEY_VALUE_LIST,
        }}
        error={errors.range}
        handleChange={onChangeRange}
        className={classes.field}
      />
      <SelectForm
        title={`決まり字`}
        name={`kimariji`}
        list={KIMARIJI_KEY_VALUE_LIST}
        value={values.kimariji === null ? 'none' : String(values.kimariji)}
        handleChange={onChange}
        className={classes.field}
      />
      <SelectForm
        title={`五色`}
        name={`color`}
        list={COLOR_KEY_VALUE_LIST}
        value={values.color === null ? 'none' : values.color}
        handleChange={onChange}
        className={classes.field}
      />

      <SelectForm
        title={`上の句`}
        name={`kamiNoKuStyle`}
        list={KARUTA_STYLE_KEY_VALUE_LIST}
        value={values.kamiNoKuStyle}
        handleChange={onChange}
        className={classes.field}
      />
      <SelectForm
        title={`下の句`}
        name={`shimoNoKuStyle`}
        list={KARUTA_STYLE_KEY_VALUE_LIST}
        value={values.shimoNoKuStyle}
        handleChange={onChange}
        className={classes.field}
      />
      <SelectForm
        title={`読み札のアニメーション表示`}
        name={`questionAnim`}
        list={QUESTION_ANIM_KEY_VALUE_LIST}
        value={values.questionAnim}
        handleChange={onChange}
        className={classes.field}
      />
      <EditButton type={`accent`} onClick={onSubmit} className={classes.startTrainingButton}>
        練習をはじめる
      </EditButton>
    </form>
  );
};

export const TrainingMenuFormContainer = ({ onSubmit, presenter: Presenter }: ContainerProps) => {
  const { trainingCondition } = useSelector<GlobalState, questionsTypes.State>((state) => state.questions);
  const { values, errors, setters } = useForm(trainingCondition);

  const handleChangeRange = useCallback(
    (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      const fieldName = e.target.name;
      const fieldValue = Number(e.target.value);
      if (fieldName === 'rangeTo') {
        setters.range({ from: values.range.from, to: fieldValue as questionsTypes.RangeToCondition });
      } else if (fieldName === 'rangeFrom') {
        setters.range({ from: fieldValue as questionsTypes.RangeFromCondition, to: values.range.to });
      }
    },
    [values.range]
  );

  const handleChange = useCallback((e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    switch (fieldName) {
      case 'kimariji':
        setters.kimariji(fieldValue === 'none' ? null : (Number(fieldValue) as questionsTypes.KimarijiCondition));
        break;
      case 'color':
        setters.color(fieldValue === 'none' ? null : (fieldValue as questionsTypes.ColorCondition));
        break;
      case 'kamiNoKuStyle':
        setters.kamiNoKuStyle(fieldValue as questionsTypes.KarutaStyleCondition);
        break;
      case 'shimoNoKuStyle':
        setters.shimoNoKuStyle(fieldValue as questionsTypes.KarutaStyleCondition);
        break;
      case 'questionAnim':
        setters.questionAnim(fieldValue as questionsTypes.QuestionAnimCondition);
        break;
    }
  }, []);

  const handleSubmit = () => {
    onSubmit(
      values.range.from,
      values.range.to,
      values.kimariji,
      values.color,
      values.kamiNoKuStyle,
      values.shimoNoKuStyle,
      values.questionAnim
    );
  };
  return (
    <Presenter
      values={values}
      errors={errors}
      setters={setters}
      onChangeRange={handleChangeRange}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export const TrainingMenuForm = (props: Props) => (
  <TrainingMenuFormContainer {...props} presenter={TrainingMenuFormPresenter} />
);

export default TrainingMenuForm;
