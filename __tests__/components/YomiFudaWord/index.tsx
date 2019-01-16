import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import YomiFudaWord, { Props } from '@src/components/YomiFudaWord';

describe('<YomiFudaWord />', () => {
  it('should render component', () => {
    const props: Props = {
      word: 'あ',
      onAnimationEnd: jest.fn(),
    };
    const renderer = ReactTestRenderer.create(<YomiFudaWord {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
