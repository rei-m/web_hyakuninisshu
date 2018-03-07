import { shallow } from 'enzyme';
import * as React from 'react';
import AboutSection from '../../../src/components/AboutSection';

describe('<AboutSection />', () => {
  it('should render AboutSection component', () => {
    const wrapper = shallow(<AboutSection />);
    expect(wrapper.type()).toEqual('a');
  });

  // it('should not render link when component is active', () => {
  //   const wrapper = shallow(
  //     <Link
  //       active={true}
  //       filter= {'filter'}
  //       onClick={jest.fn()}
  //     >
  //       test link
  //     </Link>,
  //   );
  //   expect(wrapper.type()).toEqual('span');
  // });

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

  //   wrapper.simulate('click', {
  //     preventDefault: () => {
  //       return;
  //     },
  //   });
  //   expect(mockHandler).toHaveBeenCalled();
  // });
});
