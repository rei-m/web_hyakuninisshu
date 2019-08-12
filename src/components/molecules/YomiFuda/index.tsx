import React from 'react';
import styled from '@src/styles/styled-components';
import { SPACING_UNIT } from '@src/styles/theme';
import Block from '@src/components/atoms/Block';
import YomiFudaPhrase, { SPACE } from '@src/components/molecules/YomiFudaPhrase';
import { YomiFuda as YomiFudaType } from '@src/types';

type Size = 's' | 'm' | 'l';

const RATIO_L = 1.15;
const RATIO_M = 1.0;
const RATIO_S = 0.875;
const ratioMap = {
  s: RATIO_S,
  m: RATIO_M,
  l: RATIO_L,
};

export interface Props {
  yomiFuda: YomiFudaType;
  answered: boolean;
  duration: number;
  size?: Size;
  className?: string;
}

export interface PresenterProps {
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  duration: number;
  size?: Size;
  className?: string;
  onAnimationEnd: () => void;
}

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

const Container = styled(Block)<{ size: Size }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorThin};
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.primary.dark};
  border-width: ${({ size }) => `${5 * ratioMap[size]}px`};
  border-radius: 10px;
  width: ${({ size }) => `${120 * ratioMap[size]}px`};
  height: ${({ size }) => `${205 * ratioMap[size]}px`};
  font-family: 'Sawarabi Mincho';
`;

const Inner = styled(Block)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const FirstPhrase = styled(YomiFudaPhrase)``;

const SecondPhrase = styled(YomiFudaPhrase)<{ size: Size }>`
  padding-top: ${({ size }) => `${SPACING_UNIT * 3 * ratioMap[size]}px`};
  margin-left: ${({ size }) => `${SPACING_UNIT * ratioMap[size]}px`};
  margin-right: ${({ size }) => `${SPACING_UNIT * ratioMap[size]}px`};
`;

const ThirdPhrase = styled(YomiFudaPhrase)<{ size: Size }>`
  padding-top: ${({ size }) => `${SPACING_UNIT * 6 * ratioMap[size]}px`};
`;

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

export const YomiFudaPresenter = ({
  firstLine,
  secondLine,
  thirdLine,
  duration,
  size = 'l',
  className,
  onAnimationEnd,
}: PresenterProps) => (
  <Container className={className} size={size}>
    <Inner>
      <FirstPhrase text={firstLine} duration={duration} size={size} onAnimationEnd={onAnimationEnd} />
      <SecondPhrase text={secondLine} duration={duration} size={size} onAnimationEnd={onAnimationEnd} />
      <ThirdPhrase text={thirdLine} duration={duration} size={size} onAnimationEnd={onAnimationEnd} />
    </Inner>
  </Container>
);

export const YomiFudaContainer = ({
  yomiFuda,
  className = '',
  answered,
  duration,
  size,
  presenter,
}: ContainerProps) => {
  const { firstText, secondText, thirdText } = yomiFuda;
  const durationOrAnswered = answered ? 0 : duration;

  const [position, setPosition] = React.useState(
    duration === 0 ? firstText.length + secondText.length + thirdText.length : 1
  );

  const firstLine = adjustDisplayText(firstText, 0, position);
  const secondLine = adjustDisplayText(secondText, firstText.length, position);
  const thirdLine = adjustDisplayText(thirdText, firstText.length + secondText.length, position);

  const onAnimationEnd = () => {
    if (answered) {
      return;
    }
    setPosition(position + 1);
  };

  return presenter({
    firstLine,
    secondLine,
    thirdLine,
    duration: durationOrAnswered,
    size,
    className,
    onAnimationEnd,
  });
};

const YomiFuda = (props: Props) => <YomiFudaContainer presenter={YomiFudaPresenter} {...props} />;

export default YomiFuda;
