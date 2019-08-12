import React from 'react';
import styled from '@src/styles/styled-components';
import Paragraph, { Props as ParagraphProps } from '@src/components/atoms/Paragraph';
import { Karuta } from '@src/types';

export type Props = {
  karuta: Karuta;
  separate?: React.ReactNode;
} & Pick<ParagraphProps, 'size'>;

const Container = styled(Paragraph)`
  text-align: left;
`;

const MaterialKanjiTxt = ({ karuta, size, separate = <br /> }: Props) => (
  <Container size={size}>
    {`${karuta.firstKanji} ${karuta.secondKanji} ${karuta.thirdKanji}`}
    {separate}
    {`${karuta.fourthKanji} ${karuta.fifthKanji}`}
  </Container>
);

export default MaterialKanjiTxt;
