import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import MenuIcon from '@src/components/MenuIcon';
import { MenuType } from '@src/enums';

describe('<MenuIcon />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(
      <MenuIcon iconType={MenuType.Exam} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
