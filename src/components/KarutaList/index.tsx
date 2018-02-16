import * as React from 'react';
import { Karuta } from '../../types';
import KarutaListRow from './KarutaListRow';

export interface KarutaListConnectedProps {
  karutas: Karuta[];
}

export interface KarutaListDispatchProps {
  onClickRow: (karutaId: number) => void;
}

export type KarutaListProps = KarutaListConnectedProps &
  KarutaListDispatchProps;

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
