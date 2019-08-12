import React from 'react';
import { storiesOf } from '@storybook/react';
import Kimariji from './index';

storiesOf('atoms/Kimariji', module).add('default', () => <Kimariji kimariji={3} />);
