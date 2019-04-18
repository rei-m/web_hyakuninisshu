import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Second from './index';

storiesOf('atoms/Second', module).add('default', () => <Second value={100} />);
