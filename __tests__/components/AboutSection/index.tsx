import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import AboutSection from '../../../src/components/AboutSection';

it('should render AboutSection component', () => {
  const renderer = ReactTestRenderer.create(<AboutSection />);
  expect(renderer.toJSON()).toMatchSnapshot();
});

// it('simulates click event', () => {
//   const mockHandler = jest.fn();
//   const wrapper = shallow(
//     <Link
//       active={false}
//       filter= {'filter'}
//       onClick={mockHandler}
//     >
//       test link
//     </Link>,
//   );
