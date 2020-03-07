import React from 'react';
import { storiesOf } from '@storybook/react';
import UnhandledErrorPage from './500';

storiesOf('pages/500', module).add('default', () => <UnhandledErrorPage error={new Error('error')} />);
