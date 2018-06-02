import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Frame, { FrameProps } from '@src/components/Frame';

describe('<Frame />', () => {
  let baseProps: FrameProps;

  beforeEach(() => {
    baseProps = {
      canBack: false,
      description: 'This is description',
      isDisplayNav: false,
      onClickBack: jest.fn(),
      subTitle: 'This is subtitle'
    };
  });

  it('should render component when not exist navigation', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <Frame {...baseProps} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when exist navigation', () => {
    const props = { ...baseProps, isDisplayNav: true };
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <Frame {...props} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
