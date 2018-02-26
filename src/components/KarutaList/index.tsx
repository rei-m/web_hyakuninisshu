import * as React from 'react';
import styled from 'styled-components';
import { Karuta } from '../../types';
import KarutaListRow from './KarutaListRow';

export interface KarutaListProps {
  karutas: Karuta[];
  onClickRow: (karutaId: number) => void;
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const KarutaList = ({ karutas, onClickRow }: KarutaListProps) => (
  <Root>
    {karutas.map((k, i) => (
      <KarutaListRow karuta={k} key={i} onClickRow={onClickRow} />
    ))}
  </Root>
);

export default KarutaList;
