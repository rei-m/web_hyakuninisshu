import { KarutaRepository } from '@src/domain/repositories';
import { Karuta, KarutaNo } from '@src/domain/models';
import { NoSuchElementError } from '@src/domain/errors';

export class KarutaRepositoryImpl implements KarutaRepository {
  private keyList: ReadonlyArray<KarutaNo>;
  private dataSource: ReadonlyMap<KarutaNo, Karuta>;

  constructor(karutaList: ReadonlyArray<Karuta>) {
    const keyList: Array<KarutaNo> = [];
    const dataSource: Map<KarutaNo, Karuta> = new Map();
    karutaList.forEach((karuta) => {
      keyList.push(karuta.no);
      dataSource.set(karuta.no, karuta);
    });
    this.keyList = keyList;
    this.dataSource = dataSource;
  }

  findByNo(karutaNo: KarutaNo) {
    const result = this.dataSource.get(karutaNo);
    if (!result) {
      throw new NoSuchElementError(`no=${karutaNo}`);
    }
    return result;
  }
  findByNoList(karutaNoList: ReadonlyArray<KarutaNo>) {
    const result = karutaNoList.map((karutaNo) => {
      const karuta = this.dataSource.get(karutaNo);
      if (!karuta) {
        throw new NoSuchElementError(`no=${KarutaNo}`);
      }
      return karuta;
    });

    return result;
  }

  findAll() {
    const karutaList = this.keyList.map((key) => this.dataSource.get(key)!);
    return {
      karutaList,
    };
  }
}
