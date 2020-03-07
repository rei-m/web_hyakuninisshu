import React from 'react';
import { storiesOf } from '@storybook/react';
import KarutaColor from './index';

storiesOf('atoms/KarutaColor', module).add('default', () => <KarutaColor color={`blue`} />);
