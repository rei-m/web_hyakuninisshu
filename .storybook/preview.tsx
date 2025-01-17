import React from 'react';
import type { Preview } from '@storybook/react';
import { Wrapper } from './Wrapper';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story: React.ComponentClass) => (
    <Wrapper>
      <Story />
    </Wrapper>
  ),
];

export default preview;
