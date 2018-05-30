import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import NavIcon from '@src/components/NavIcon';
import { MenuType } from '@src/enums';

describe('<NavIcon />', () => {
  it('should render component when current', () => {
    const renderer = ReactTestRenderer.create(
      <NavIcon iconType={MenuType.Exam} text="hoge" isCurrent={true} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when not current', () => {
    const renderer = ReactTestRenderer.create(
      <NavIcon iconType={MenuType.Exam} text="hoge" isCurrent={false} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
