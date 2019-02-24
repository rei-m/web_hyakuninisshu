import * as React from 'react';
import styled from '@src/styles/styled-components';
import { YomiFuda } from '@src/types';
import YomiFudaWord, { SPACE } from '@src/components/YomiFudaWord';

export interface Props {
  yomiFuda: YomiFuda;
  answered: boolean;
  dulation: number;
  style?: React.CSSProperties;
}

export interface State {
  currentPosition: number;
}

const Container = styled.div`
  width: 140px;
  height: 240px;
  border: 6px solid ${({ theme }) => theme.colorPrimaryDark};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorThin};
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.26);
  font-family: 'Sawarabi Mincho';
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const Phrase = styled.div`
  width: 1.9rem;
  font-size: 1.9rem;
  line-height: 2rem;
`;

const SecondPhrase = styled(Phrase)`
  padding-top: 24px;
  margin-left: 8px;
  margin-right: 8px;
`;

const ThirdPhrase = styled(Phrase)`
  padding-top: 48px;
`;

// 各フレーズの文字数を最大に合わせる
// 縦書きのエレメントを絶対位置で指定する

const adjustDisplayText = (text: string, startIndex: number, currentPosition: number) => {
  if (currentPosition < startIndex) {
    return Array.from(Array(text.length).keys())
      .map(_ => SPACE)
      .join('');
  }
  const line = currentPosition > startIndex ? text.substr(0, currentPosition - startIndex) : '';
  const mod = text.length - (currentPosition - startIndex);
  const linePad =
    mod > 0
      ? Array.from(Array(mod).keys())
          .map(_ => SPACE)
          .join('')
      : '';
  return line + linePad;
};

const YomiFudaView: React.FC<Props> = ({ yomiFuda, style, answered, dulation }) => {
  const [state, setState] = React.useState<State>({ currentPosition: 1 });

  const { firstText, secondText, thirdText } = yomiFuda;
  const firstLine = adjustDisplayText(firstText, 0, state.currentPosition);
  const secondLine = adjustDisplayText(secondText, firstText.length, state.currentPosition);
  const thirdLine = adjustDisplayText(thirdText, firstText.length + secondText.length, state.currentPosition);

  const onAnimationEnd = () => {
    setState({ currentPosition: state.currentPosition + 1 });
  };

  return (
    <Container style={style}>
      <Inner>
        {dulation === 0 || answered ? (
          <>
            <Phrase>{yomiFuda.firstText}</Phrase>
            <SecondPhrase>{yomiFuda.secondText}</SecondPhrase>
            <ThirdPhrase>{yomiFuda.thirdText}</ThirdPhrase>
          </>
        ) : (
          <>
            <Phrase>
              {Array.from(firstLine).map((s, i) => (
                <YomiFudaWord word={s} dulation={dulation} onAnimationEnd={onAnimationEnd} key={i} />
              ))}
            </Phrase>
            <SecondPhrase>
              {Array.from(secondLine).map((s, i) => (
                <YomiFudaWord word={s} dulation={dulation} onAnimationEnd={onAnimationEnd} key={i} />
              ))}
            </SecondPhrase>
            <ThirdPhrase>
              {Array.from(thirdLine).map((s, i) => (
                <YomiFudaWord word={s} dulation={dulation} onAnimationEnd={onAnimationEnd} key={i} />
              ))}
            </ThirdPhrase>
          </>
        )}
      </Inner>
    </Container>
  );
};

export default YomiFudaView;
