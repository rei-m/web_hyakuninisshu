import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import QuestionResultsSummary from '@src/components/atoms/QuestionsResultSummary';

describe('<QuestionResultsSummary />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<QuestionResultsSummary title="平均解答時間" value="5秒" />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
