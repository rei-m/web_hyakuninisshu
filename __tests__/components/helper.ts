import * as helper from '../../src/components/helper';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition
} from '../../src/enums/index';

describe('components/helper', () => {
  it('should convert number to chinese character', () => {
    expect(helper.toChineseChar(1)).toEqual('一');
    expect(helper.toChineseChar(11)).toEqual('十一');
    expect(helper.toChineseChar(100)).toEqual('百');
  });

  it('should convert karutaId to string', () => {
    expect(helper.toKarutaIdString(1)).toEqual('一番');
  });

  it('should convert kimariji to string', () => {
    expect(helper.toKimarijiString(1)).toEqual('一字決まり');
  });

  it('should convert kimarijiCondition to string', () => {
    expect(helper.toKimarijiConditionString(KimarijiCondition.None)).toEqual(
      '指定しない'
    );
  });

  it('should convert colorCondition to string', () => {
    expect(helper.toColorConditionString(ColorCondition.None)).toEqual(
      '指定しない'
    );
    expect(helper.toColorConditionString(ColorCondition.Blue)).toEqual('青色');
    expect(helper.toColorConditionString(ColorCondition.Pink)).toEqual('桃色');
    expect(helper.toColorConditionString(ColorCondition.Yellow)).toEqual(
      '黄色'
    );
    expect(helper.toColorConditionString(ColorCondition.Green)).toEqual('緑色');
    expect(helper.toColorConditionString(ColorCondition.Orange)).toEqual(
      '橙色'
    );
  });

  it('should convert styleCondition to string', () => {
    expect(
      helper.toKarutaStyleConditionString(KarutaStyleCondition.KanaOnly)
    ).toEqual('すべて仮名で表示');
    expect(
      helper.toKarutaStyleConditionString(KarutaStyleCondition.KanjiAndKana)
    ).toEqual('漢字と仮名で表示');
  });
});
