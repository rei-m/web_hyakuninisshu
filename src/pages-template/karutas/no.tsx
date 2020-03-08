import React from 'react';
import KarutasNoPage from '@src/presentation/components/pages/karutas/no';
import { GeneratedPageComponentProps } from '@src/presentation/types';
import { Karuta } from '@src/domain/models';

export type PageContext = {
  karuta: Karuta;
};

export type Props = GeneratedPageComponentProps<PageContext>;

const KarutasNoGatsbyPage = ({ pageContext }: Props) => {
  const { karuta } = pageContext;
  return <KarutasNoPage karuta={karuta} />;
};

export default KarutasNoGatsbyPage;
