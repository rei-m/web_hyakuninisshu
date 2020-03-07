import { KarutaRepository } from '@src/domain/repositories';
import { Karuta, KarutaNo } from '@src/domain/models';

export class KarutaRepositoryImpl implements KarutaRepository {
  private keyList: ReadonlyArray<KarutaNo>;
  private dataSource: ReadonlyMap<KarutaNo, Karuta>;

  constructor(karutaList: Array<Karuta>) {
    const keyList: Array<KarutaNo> = [];
    const dataSource: Map<KarutaNo, Karuta> = new Map();
    karutaList.forEach(karuta => {
      keyList.push(karuta.no);
      dataSource.set(karuta.no, karuta);
    });
    this.keyList = keyList;
    this.dataSource = dataSource;
  }

  findByNo(karutaNo: KarutaNo) {
    const result = this.dataSource.get(karutaNo);
    if (!result) {
      throw new Error(`NoSuchElement: no=${karutaNo}`);
    }
    return result;
  }
  findByNoList(karutaNoList: Array<KarutaNo>) {
    const result = karutaNoList.map(karutaNo => {
      const karuta = this.dataSource.get(karutaNo);
      if (!karuta) {
        throw new Error(`NoSuchElement: no=${KarutaNo}`);
      }
      return karuta;
    });

    return result;
  }

  findAll() {
    return this.keyList.map(key => this.dataSource.get(key)!);
  }
}
