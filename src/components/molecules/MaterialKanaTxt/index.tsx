import * as React from 'react';
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

const KimarijiTxt = styled.span`
  color: #ff0000;
`;

const MaterialKanaTxt = ({ karuta, size, separate = <br /> }: Props) => {
  const { kimariji, firstKana, secondKana, thirdKana } = karuta;
  const modKimariji = firstKana.length - kimariji;
  return modKimariji >= 0 ? (
    <Container size={size}>
      <KimarijiTxt>{firstKana.slice(0, kimariji)}</KimarijiTxt>
      {modKimariji > 0
        ? `${firstKana.slice(kimariji - firstKana.length)} ${secondKana} ${thirdKana}`
        : ` ${secondKana} ${thirdKana}`}
      {separate}
      {`${karuta.fourthKana} ${karuta.fifthKana}`}
    </Container>
  ) : (
    <Container size={size}>
      <KimarijiTxt>{`${firstKana} ${secondKana.slice(0, modKimariji * -1)}`}</KimarijiTxt>
      {`${secondKana.slice(modKimariji * -1)} ${thirdKana}`}
      {separate}
      {`${karuta.fourthKana} ${karuta.fifthKana}`}
    </Container>
  );
};

export default MaterialKanaTxt;
