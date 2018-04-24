import * as React from 'react';
import { toKarutaIdString } from '@src/components/helper';
// TODO: Spriteする??
import * as karuta001 from './karuta_001.jpg';
import * as karuta002 from './karuta_002.jpg';
import * as karuta003 from './karuta_003.jpg';
import * as karuta004 from './karuta_004.jpg';
import * as karuta005 from './karuta_005.jpg';
import * as karuta006 from './karuta_006.jpg';
import * as karuta007 from './karuta_007.jpg';
import * as karuta008 from './karuta_008.jpg';
import * as karuta009 from './karuta_009.jpg';
import * as karuta010 from './karuta_010.jpg';
import * as karuta011 from './karuta_011.jpg';
import * as karuta012 from './karuta_012.jpg';
import * as karuta013 from './karuta_013.jpg';
import * as karuta014 from './karuta_014.jpg';
import * as karuta015 from './karuta_015.jpg';
import * as karuta016 from './karuta_016.jpg';
import * as karuta017 from './karuta_017.jpg';
import * as karuta018 from './karuta_018.jpg';
import * as karuta019 from './karuta_019.jpg';
import * as karuta020 from './karuta_020.jpg';
import * as karuta021 from './karuta_021.jpg';
import * as karuta022 from './karuta_022.jpg';
import * as karuta023 from './karuta_023.jpg';
import * as karuta024 from './karuta_024.jpg';
import * as karuta025 from './karuta_025.jpg';
import * as karuta026 from './karuta_026.jpg';
import * as karuta027 from './karuta_027.jpg';
import * as karuta028 from './karuta_028.jpg';
import * as karuta029 from './karuta_029.jpg';
import * as karuta030 from './karuta_030.jpg';
import * as karuta031 from './karuta_031.jpg';
import * as karuta032 from './karuta_032.jpg';
import * as karuta033 from './karuta_033.jpg';
import * as karuta034 from './karuta_034.jpg';
import * as karuta035 from './karuta_035.jpg';
import * as karuta036 from './karuta_036.jpg';
import * as karuta037 from './karuta_037.jpg';
import * as karuta038 from './karuta_038.jpg';
import * as karuta039 from './karuta_039.jpg';
import * as karuta040 from './karuta_040.jpg';
import * as karuta041 from './karuta_041.jpg';
import * as karuta042 from './karuta_042.jpg';
import * as karuta043 from './karuta_043.jpg';
import * as karuta044 from './karuta_044.jpg';
import * as karuta045 from './karuta_045.jpg';
import * as karuta046 from './karuta_046.jpg';
import * as karuta047 from './karuta_047.jpg';
import * as karuta048 from './karuta_048.jpg';
import * as karuta049 from './karuta_049.jpg';
import * as karuta050 from './karuta_050.jpg';
import * as karuta051 from './karuta_051.jpg';
import * as karuta052 from './karuta_052.jpg';
import * as karuta053 from './karuta_053.jpg';
import * as karuta054 from './karuta_054.jpg';
import * as karuta055 from './karuta_055.jpg';
import * as karuta056 from './karuta_056.jpg';
import * as karuta057 from './karuta_057.jpg';
import * as karuta058 from './karuta_058.jpg';
import * as karuta059 from './karuta_059.jpg';
import * as karuta060 from './karuta_060.jpg';
import * as karuta061 from './karuta_061.jpg';
import * as karuta062 from './karuta_062.jpg';
import * as karuta063 from './karuta_063.jpg';
import * as karuta064 from './karuta_064.jpg';
import * as karuta065 from './karuta_065.jpg';
import * as karuta066 from './karuta_066.jpg';
import * as karuta067 from './karuta_067.jpg';
import * as karuta068 from './karuta_068.jpg';
import * as karuta069 from './karuta_069.jpg';
import * as karuta070 from './karuta_070.jpg';
import * as karuta071 from './karuta_071.jpg';
import * as karuta072 from './karuta_072.jpg';
import * as karuta073 from './karuta_073.jpg';
import * as karuta074 from './karuta_074.jpg';
import * as karuta075 from './karuta_075.jpg';
import * as karuta076 from './karuta_076.jpg';
import * as karuta077 from './karuta_077.jpg';
import * as karuta078 from './karuta_078.jpg';
import * as karuta079 from './karuta_079.jpg';
import * as karuta080 from './karuta_080.jpg';
import * as karuta081 from './karuta_081.jpg';
import * as karuta082 from './karuta_082.jpg';
import * as karuta083 from './karuta_083.jpg';
import * as karuta084 from './karuta_084.jpg';
import * as karuta085 from './karuta_085.jpg';
import * as karuta086 from './karuta_086.jpg';
import * as karuta087 from './karuta_087.jpg';
import * as karuta088 from './karuta_088.jpg';
import * as karuta089 from './karuta_089.jpg';
import * as karuta090 from './karuta_090.jpg';
import * as karuta091 from './karuta_091.jpg';
import * as karuta092 from './karuta_092.jpg';
import * as karuta093 from './karuta_093.jpg';
import * as karuta094 from './karuta_094.jpg';
import * as karuta095 from './karuta_095.jpg';
import * as karuta096 from './karuta_096.jpg';
import * as karuta097 from './karuta_097.jpg';
import * as karuta098 from './karuta_098.jpg';
import * as karuta099 from './karuta_099.jpg';
import * as karuta100 from './karuta_100.jpg';

const KARUTA_IMAGE_LIST = [
  karuta001,
  karuta002,
  karuta003,
  karuta004,
  karuta005,
  karuta006,
  karuta007,
  karuta008,
  karuta009,
  karuta010,
  karuta011,
  karuta012,
  karuta013,
  karuta014,
  karuta015,
  karuta016,
  karuta017,
  karuta018,
  karuta019,
  karuta020,
  karuta021,
  karuta022,
  karuta023,
  karuta024,
  karuta025,
  karuta026,
  karuta027,
  karuta028,
  karuta029,
  karuta030,
  karuta031,
  karuta032,
  karuta033,
  karuta034,
  karuta035,
  karuta036,
  karuta037,
  karuta038,
  karuta039,
  karuta040,
  karuta041,
  karuta042,
  karuta043,
  karuta044,
  karuta045,
  karuta046,
  karuta047,
  karuta048,
  karuta049,
  karuta050,
  karuta051,
  karuta052,
  karuta053,
  karuta054,
  karuta055,
  karuta056,
  karuta057,
  karuta058,
  karuta059,
  karuta060,
  karuta061,
  karuta062,
  karuta063,
  karuta064,
  karuta065,
  karuta066,
  karuta067,
  karuta068,
  karuta069,
  karuta070,
  karuta071,
  karuta072,
  karuta073,
  karuta074,
  karuta075,
  karuta076,
  karuta077,
  karuta078,
  karuta079,
  karuta080,
  karuta081,
  karuta082,
  karuta083,
  karuta084,
  karuta085,
  karuta086,
  karuta087,
  karuta088,
  karuta089,
  karuta090,
  karuta091,
  karuta092,
  karuta093,
  karuta094,
  karuta095,
  karuta096,
  karuta097,
  karuta098,
  karuta099,
  karuta100
];

export interface KarutaImageProps {
  readonly karutaId: number;
  readonly style?: React.CSSProperties;
}

const KarutaImage: React.SFC<KarutaImageProps> = ({ karutaId, style }) => (
  <img
    src={KARUTA_IMAGE_LIST[karutaId - 1]}
    alt={toKarutaIdString(karutaId)}
    style={style}
  />
);

export default KarutaImage;
