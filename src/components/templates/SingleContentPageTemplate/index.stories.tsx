import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SingleContentPageTemplate from './index';

storiesOf('templates/SingleContentPageTemplate', module).add('default', () => (
  <SingleContentPageTemplate
    title={`SingleContentPageTemplate`}
    keywords={[]}
    pageTitle={`コンテンツが1つのページ`}
    content={
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio corporis modi incidunt sed temporibus qui
        cum veritatis animi, praesentium culpa quaerat vero dolores aut ratione eos error distinctio nulla.
      </span>
    }
  />
));
