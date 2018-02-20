import * as React from 'react';
import { Karuta } from '../../types';
import KarutaListRow from './KarutaListRow';

export interface KarutaListProps {
  karutas: Karuta[];
  onClickRow: (karutaId: number) => void;
}

const KarutaList = ({ karutas, onClickRow }: KarutaListProps) => {
  return (
    <div>
      {karutas.map((k, i) => (
        <KarutaListRow karuta={k} key={i} onClickRow={onClickRow} />
      ))}
    </div>
  );
};

export default KarutaList;
