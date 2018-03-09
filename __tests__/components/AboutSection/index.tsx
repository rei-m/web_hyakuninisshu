import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import AboutSection from '../../../src/components/AboutSection';

describe('<AboutSection />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<AboutSection />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
