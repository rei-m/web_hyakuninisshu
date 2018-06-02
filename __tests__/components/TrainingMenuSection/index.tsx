import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import TrainingMenuSection, {
  TrainingMenuSectionProps
} from '@src/components/TrainingMenuSection';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  RangeFromCondition,
  RangeToCondition
} from '@src/enums';

describe('<TrainingMenuSection />', () => {
  it('should render component', () => {
    const props: TrainingMenuSectionProps = {
      initialColor: ColorCondition.None,
      initialKamiNoKuStyle: KarutaStyleCondition.KanjiAndKana,
      initialKimariji: KimarijiCondition.One,
      initialRangeFrom: RangeFromCondition.One,
      initialRangeTo: RangeToCondition.OneHundred,
      initialShimoNoKuStyle: KarutaStyleCondition.KanaOnly,
      onSubmit: jest.fn()
    };

    const renderer = ReactTestRenderer.create(
      <TrainingMenuSection {...props} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
