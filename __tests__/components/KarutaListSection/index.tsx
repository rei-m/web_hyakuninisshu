import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '../../factories';
import KarutaListSection, {
  KarutaListSectionProps
} from '@src/components/KarutaListSection';
import KarutaList from '@src/components/KarutaList';
import { Karuta } from '@src/types';

describe('<KarutaListSection />', () => {
  let props: KarutaListSectionProps;

  beforeEach(() => {
    props = {
      karutas: [
        create<Karuta>('karuta', {
          id: 1
        }),
        create<Karuta>('karuta', {
          id: 2
        })
      ],
      onClickKarutaListRow: jest.fn()
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<KarutaListSection {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickKarutaListRow when KarutaList clicked', () => {
    const wrapper = shallow(<KarutaListSection {...props} />);
    wrapper
      .find(KarutaList)
      .props()
      .onClickRow(1);
    expect(props.onClickKarutaListRow).toHaveBeenCalledWith(1);
  });
});
