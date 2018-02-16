import * as React from 'react';
import { Karuta } from '../../types';

export interface KarutaCardProps {
  karuta: Karuta;
}

const KarutaCard = ({ karuta }: KarutaCardProps) => {
  return (
    <div>
      <div>{karuta.id}</div>
    </div>
  );
};

export default KarutaCard;
