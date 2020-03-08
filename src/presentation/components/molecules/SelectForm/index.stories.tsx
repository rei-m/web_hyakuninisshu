import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SelectForm from './index';

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

storiesOf('molecules/SelectForm', module).add('default', () => (
  <SelectForm title={`あいてむ`} name={`item`} value={`1`} list={list} handleChange={action(`handleChange`)} />
));
