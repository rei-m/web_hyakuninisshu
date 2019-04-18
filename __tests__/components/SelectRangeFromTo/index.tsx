import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import SelectRangeFromTo, { Props } from '@src/components/molecules/SelectRangeFromTo';

describe('<SelectRangeFromTo />', () => {
  it('should render component', () => {
    const props: Props = {
      from: 'from',
      to: 'to',
      handleChange: jest.fn(),
    };
    const renderer = ReactTestRenderer.create(<SelectRangeFromTo {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
