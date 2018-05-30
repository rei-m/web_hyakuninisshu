import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '@src/components/Navigation';
import { MenuType } from '@src/enums';

describe('<Navigation />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is training', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <Navigation currentMenuType={MenuType.Training} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is exam', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <Navigation currentMenuType={MenuType.Exam} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is material', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <Navigation currentMenuType={MenuType.Material} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is other', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <Navigation currentMenuType={MenuType.Other} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
