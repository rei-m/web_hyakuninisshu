import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import SelectItem, { Props } from '@src/components/molecules/SelectItem';

describe('<SelectItem />', () => {
  it('should render component', () => {
    const props: Props = {
      title: 'title',
      name: 'name',
      value: 'value',
      valueList: [1, 2, 3],
      nameList: ['1', '2', '3'],
      handleChange: jest.fn(),
    };
    const renderer = ReactTestRenderer.create(<SelectItem {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
