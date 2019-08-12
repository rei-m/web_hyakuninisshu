import React from 'react';
import { storiesOf } from '@storybook/react';
import KarutaNo from './index';

storiesOf('atoms/KarutaNo', module).add('default', () => <KarutaNo karutaNo={100} />);
