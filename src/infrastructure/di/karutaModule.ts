import { KarutaRepository } from '@src/domain/repositories';
import { Karuta } from '@src/domain/models';
import { KarutaRepositoryImpl } from '../repositories/KarutaRepositoryImpl';

export type Module = {
  karutaRepository: KarutaRepository;
};

export const inject = (allKarutaList: Array<Karuta>): Module => {
  return {
    karutaRepository: new KarutaRepositoryImpl(allKarutaList),
  };
};
