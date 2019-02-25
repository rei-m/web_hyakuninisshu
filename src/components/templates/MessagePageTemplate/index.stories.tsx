import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator } from '@helper/storybook';
import MessagePageTemplate from './index';

storiesOf('templates/MessagePageTemplate', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => (
    <MessagePageTemplate>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio corporis modi incidunt sed temporibus qui cum
      veritatis animi, praesentium culpa quaerat vero dolores aut ratione eos error distinctio nulla.
    </MessagePageTemplate>
  ));
