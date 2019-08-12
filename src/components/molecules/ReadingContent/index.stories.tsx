import React from 'react';
import { storiesOf } from '@storybook/react';
import ReadingContent from './index';

storiesOf('molecules/ReadingContent', module).add('default', () => (
  <ReadingContent title={`読み物`}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dignissimos et, voluptatum molestiae ipsam veniam
    libero nulla iure, magnam sequi quibusdam laudantium, laboriosam dolore. Inventore voluptate nisi autem id maxime?
  </ReadingContent>
));
