const initializerTree: { [key: string]: () => any } = {};
const idKeyTree: { [key: string]: string } = {};
const idHolder: { [key: string]: number } = {};

export const create = <T>(
  name: string,
  params: { [P in keyof T]?: T[P] } = {}
): T => {
  const value = initializerTree[name]();
  if (value) {
    if (value.id) {
      const idKey = idKeyTree[name];
      const id = idHolder[idKey] ? idHolder[idKey] + 1 : 1;
      idHolder[idKey] = id;
      return { ...value, id, ...(params as any) };
    }
    return { ...value, ...(params as any) };
  }
  throw new Error(`${name}'s factory is not found`);
};
