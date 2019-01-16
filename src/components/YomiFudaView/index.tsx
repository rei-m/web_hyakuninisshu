import * as React from 'react';
import styled from '@src/styles/styled-components';
import { YomiFuda } from '@src/types';
import YomiFudaWord, { SPACE } from '@src/components/YomiFudaWord';

export interface Props {
  yomiFuda: YomiFuda;
  answered: boolean;
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

class YomiFudaView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { currentPosition: 1 };
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  public render() {
    const { yomiFuda, style, answered } = this.props;
    const { firstText, secondText, thirdText } = yomiFuda;
    const firstLine = this.adjustDisplayText(firstText, 0);
    const secondLine = this.adjustDisplayText(secondText, firstText.length);
    const thirdLine = this.adjustDisplayText(thirdText, firstText.length + secondText.length);
    return (
      <Container style={style}>
        <Inner>
          {answered ? (
            <>
              <Phrase>{yomiFuda.firstText}</Phrase>
              <SecondPhrase>{yomiFuda.secondText}</SecondPhrase>
              <ThirdPhrase>{yomiFuda.thirdText}</ThirdPhrase>
            </>
          ) : (
            <>
              <Phrase>
                {Array.from(firstLine).map((s, i) => (
                  <YomiFudaWord word={s} onAnimationEnd={this.onAnimationEnd} key={i} />
                ))}
              </Phrase>
              <SecondPhrase>
                {Array.from(secondLine).map((s, i) => (
                  <YomiFudaWord word={s} onAnimationEnd={this.onAnimationEnd} key={i} />
                ))}
              </SecondPhrase>
              <ThirdPhrase>
                {Array.from(thirdLine).map((s, i) => (
                  <YomiFudaWord word={s} onAnimationEnd={this.onAnimationEnd} key={i} />
                ))}
              </ThirdPhrase>
            </>
          )}
        </Inner>
      </Container>
    );
  }

  private adjustDisplayText(text: string, startIndex: number) {
    const { currentPosition } = this.state;
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
  }

  private onAnimationEnd() {
    this.setState({ currentPosition: this.state.currentPosition + 1 });
  }
}

export default YomiFudaView;
