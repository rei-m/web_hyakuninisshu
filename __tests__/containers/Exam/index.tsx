import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ExamIndex from '@src/containers/Exam';
import ExamMenuSection from '@src/components/ExamMenuSection';
import { ROUTE_PATHS } from '@src/constants';

describe('<Exam />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      history: {
        push: jest.fn()
      },
      route: {
        location: { pathname: '/exam' },
        match: { params: {} }
      }
    };
    wrapper = shallow(<ExamIndex />).dive({
      context: {
        router: mockRouter
      }
    });
  });

  it('should render component', () => {
    expect(wrapper.dive().find(ExamMenuSection).length).toBe(1);
  });

  it('should push next page to history when components onSubmit fired', () => {
    wrapper
      .dive()
      .find(ExamMenuSection)
      .props()
      .onSubmit();
    expect(mockRouter.history.push).toHaveBeenCalledWith(
      ROUTE_PATHS.EXAM_QUESTION,
      { submitTime: expect.any(Number) }
    );
  });
});
