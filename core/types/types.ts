export type MaybeArray<T> = T | Array<T>;

export const getArray = <T>(value: MaybeArray<T>): Array<T> => {
  return Array.isArray(value) ? value : [value];
};
