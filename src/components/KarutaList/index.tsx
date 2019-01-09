import * as React from 'react';
import styled from '@src/styles/styled-components';
import Row from '@src/components/KarutaList/Row';
import { Karuta } from '@src/types';

export interface Props {
  karutas: Karuta[];
  onClickRow: (karutaNo: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

const KarutaList: React.FC<Props> = ({ karutas, onClickRow }) => (
  <Container>
    {karutas.map(karuta => (
      <Row karuta={karuta} key={karuta.id} onClickRow={onClickRow} data-test={`row-${karuta.no}`} />
    ))}
  </Container>
);
export default KarutaList;
