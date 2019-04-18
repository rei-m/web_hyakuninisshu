import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import ErrorMessage, { Props } from '@src/components/atoms/ErrorMessage';

describe('<ErrorMessage />', () => {
  let baseProps: Props;

  beforeEach(() => {
    baseProps = {
      text: 'Test',
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<ErrorMessage {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
