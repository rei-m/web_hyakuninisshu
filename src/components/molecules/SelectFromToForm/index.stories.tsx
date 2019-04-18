import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SelectFromToForm from './index';

const list = [
  {
    value: '1',
    text: 'いちばん',
  },
  {
    value: '2',
    text: 'にばん',
  },
  {
    value: '3',
    text: 'さんばん',
  },
];

const from = {
  name: 'ふろむ',
  value: '1',
  list,
};

const to = {
  name: 'とぅー',
  value: '1',
  list,
};

storiesOf('molecules/SelectFromToForm', module)
  .add('default', () => (
    <SelectFromToForm title={`あいてむ`} from={from} to={to} handleChange={action(`handleChange`)} />
  ))
  .add('with error', () => (
    <SelectFromToForm
      title={`あいてむ`}
      from={from}
      to={to}
      handleChange={action(`handleChange`)}
      error={'間違ってます'}
    />
  ));
