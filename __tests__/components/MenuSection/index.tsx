import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import MenuSection from '@src/components/MenuSection';

describe('<MenuSection />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <MenuSection />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
