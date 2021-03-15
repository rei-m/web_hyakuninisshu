import React from 'react';
import { Wrapper } from './Wrapper';

export const decorators = [
  (Story) => (
    <Wrapper>
      <Story />
    </Wrapper>
  ),
];
