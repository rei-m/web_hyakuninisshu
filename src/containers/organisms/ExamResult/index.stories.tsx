// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { ExamResultPresenter, PresenterProps } from './index';
// import { create } from '@helper/factory';
// import { Answer, Karuta, Question } from '@src/types';

// const questions = [...Array(100).keys()].map(_ => create<Question>('question'));
// const answers = [...Array(100).keys()].map(_ => create<Answer>('answer'));
// const karuta = create<Karuta>('karuta');

// const props: PresenterProps = {
//   questions,
//   answers,
//   onClickResult: action('onClickResult'),
//   onClickBack: action('onClickBack'),
//   onClickRestart: action('onClickRestart'),
//   onCloseDialog: action('onCloseDialog'),
// };

// storiesOf('organisms/ExamResult', module)
//   .add('default', () => <ExamResultPresenter {...props} />)
//   .add('open karuta', () => <ExamResultPresenter {...props} displayedKaruta={karuta} />);
