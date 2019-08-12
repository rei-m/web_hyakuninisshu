import React from 'react';
import { storiesOf } from '@storybook/react';
import Ratio from './index';

storiesOf('atoms/Ratio', module).add('default', () => <Ratio denominator={100} numerator={50} />);
