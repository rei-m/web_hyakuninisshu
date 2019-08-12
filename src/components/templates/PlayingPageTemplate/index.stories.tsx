import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayingPageTemplate from './index';

storiesOf('templates/PlayingPageTemplate', module).add('default', () => (
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
