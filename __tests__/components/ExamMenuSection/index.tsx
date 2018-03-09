import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import ExamMenuSection from '../../../src/components/ExamMenuSection';
import { sel } from '../../helpers';

describe('<ExamMenuSection />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(
      <ExamMenuSection onSubmit={jest.fn()} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onSubmit when start button clicked', () => {
    const mockHandler = jest.fn();
    const wrapper = shallow(<ExamMenuSection onSubmit={mockHandler} />);
    wrapper.find(sel('start-exam-button')).simulate('click');
    expect(mockHandler).toHaveBeenCalled();
  });
});
