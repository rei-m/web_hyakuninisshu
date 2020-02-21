import React from 'react';
import { storiesOf } from '@storybook/react';
import MessagePageTemplate from './index';

storiesOf('templates/MessagePageTemplate', module).add('default', () => (
  <MessagePageTemplate>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio corporis modi incidunt sed temporibus qui cum
    veritatis animi, praesentium culpa quaerat vero dolores aut ratione eos error distinctio nulla.
  </MessagePageTemplate>
));
