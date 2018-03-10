import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import PageTitle from '../../../src/components/PageTitle';

describe('<PageTitle />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<PageTitle title="hoge" />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
