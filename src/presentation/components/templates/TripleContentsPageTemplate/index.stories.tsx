import React from 'react';
import { storiesOf } from '@storybook/react';
import TripleContentsPageTemplate from './index';

storiesOf('templates/TripleContentsPageTemplate', module).add('default', () => (
  <TripleContentsPageTemplate
    title={`TripleContentsPageTemplate`}
    keywords={[]}
    top={
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio corporis modi incidunt sed temporibus qui
        cum veritatis animi, praesentium culpa quaerat vero dolores aut ratione eos error distinctio nulla.
      </span>
    }
    middle={
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio corporis modi incidunt sed temporibus qui
        cum veritatis animi, praesentium culpa quaerat vero dolores aut ratione eos error distinctio nulla.
      </span>
    }
    bottom={
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio corporis modi incidunt sed temporibus qui
        cum veritatis animi, praesentium culpa quaerat vero dolores aut ratione eos error distinctio nulla.
      </span>
    }
  />
));
