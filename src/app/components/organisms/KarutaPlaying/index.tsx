import Image from 'next/image';
import Box from '@mui/material/Box';
import { ToriFudaView } from '@/app/components/organisms/ToriFudaView';
import { YomiFudaView } from '@/app/components/organisms/YomiFudaView';
import { Ratio } from '@/app/components/atoms/Ratio';

import type { KarutaNo, QuestionId, ToriFuda, YomiFuda } from '@/domains/models';

export type KarutaPlayingProps = {
  questionId: QuestionId;
  yomiFuda: YomiFuda;
  toriFudaList: [ToriFuda, ToriFuda, ToriFuda, ToriFuda];
  totalCount: number;
  currentPosition: number;
  duration: number;
  answer?: {
    isCorrect: boolean;
    selectedKarutaNo: KarutaNo;
  };
  onClickToriFuda: (questionId: QuestionId, toriFuda: ToriFuda) => void;
  onClickResult: () => void;
};

export const KarutaPlaying = ({
  questionId,
  yomiFuda,
  toriFudaList,
  currentPosition,
  totalCount,
  duration,
  answer,
  onClickToriFuda,
  onClickResult,
}: KarutaPlayingProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 3,
        width: 312,
      }}
    >
      <Ratio
        denominator={totalCount}
        numerator={currentPosition}
        sx={{
          color: '#fff !important',
          borderBottom: '1px dotted #fff',
          position: 'absolute',
          right: 0,
          top: -32,
        }}
      />
      <YomiFudaView yomiFuda={yomiFuda} answered={!!answer} duration={duration} size="l" sx={{ boxShadow: 1 }} />
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row-reverse',
      }}
    >
      {toriFudaList.map((toriFuda) => (
        <ToriFudaView
          key={toriFuda.karutaNo}
          toriFuda={toriFuda}
          thin={!!answer && answer.selectedKarutaNo === toriFuda.karutaNo}
          onClick={() => {
            onClickToriFuda(questionId, toriFuda);
          }}
          sx={{
            margin: 1,
            boxShadow: 1,
          }}
        />
      ))}
    </Box>
    {answer && (
      <Box
        onClick={onClickResult}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <Image
          src={answer.isCorrect ? '/question/check_correct.png' : '/question/check_incorrect.png'}
          alt={answer.isCorrect ? '正解' : '不正解'}
          width={300}
          height={300}
        />
      </Box>
    )}
  </Box>
);