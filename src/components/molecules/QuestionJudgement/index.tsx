import * as React from 'react';
import Img from 'gatsby-image';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import KarutaNo from '@src/components/atoms/KarutaNo';
import { Karuta } from '@src/types';
import { useCorrectImage } from '@src/hooks/staticQueries/useCorrectImage';

export interface Props {
  karuta: Karuta;
  correct: boolean;
  className?: string;
  onClick?: (karuta: Karuta) => void;
}

const Container = styled(Block)`
  ${({ theme }) => theme.centering}
  width: 100px;
  height: 100px;
  position: relative;
`;

const ImageBox = styled(Block)`
  ${({ theme }) => theme.centering}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const QuestionJudgement = ({ karuta, correct, className, onClick }: Props) => {
  const [correctImage, incorrectImage] = useCorrectImage();
  const handleOnClick = React.useCallback(() => {
    if (onClick) {
      onClick(karuta);
    }
  }, []);
  return (
    <Container onClick={handleOnClick} className={className}>
      <KarutaNo karutaNo={karuta.no} size={`ss`} />
      <ImageBox>
        <Img fluid={correct ? correctImage : incorrectImage} style={{ width: '80%' }} />
      </ImageBox>
    </Container>
  );
};

export default React.memo(
  QuestionJudgement,
  (prevProps, nextProps) => prevProps.karuta.no === nextProps.karuta.no && prevProps.correct === nextProps.correct
);
