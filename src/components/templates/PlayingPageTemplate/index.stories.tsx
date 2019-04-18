import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { appContextDecorator } from '@helper/storybook';
import PlayingPageTemplate from './index';

storiesOf('templates/PlayingPageTemplate', module)
  .addDecorator(story => appContextDecorator(story))
  .add('default', () => (
    <PlayingPageTemplate
      title={`PlayingPageTemplate`}
      content={
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio corporis modi incidunt sed temporibus qui
          cum veritatis animi, praesentium culpa quaerat vero dolores aut ratione eos error distinctio nulla.
        </span>
      }
    />
  ));
