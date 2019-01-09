import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Navigation from '@src/components/Navigation';
import { MenuType } from '@src/enums';

describe('<Navigation />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Navigation />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is training', () => {
    const renderer = ReactTestRenderer.create(<Navigation currentMenuType={MenuType.Training} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is exam', () => {
    const renderer = ReactTestRenderer.create(<Navigation currentMenuType={MenuType.Exam} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is material', () => {
    const renderer = ReactTestRenderer.create(<Navigation currentMenuType={MenuType.Material} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when current is other', () => {
    const renderer = ReactTestRenderer.create(<Navigation currentMenuType={MenuType.Other} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
