import { MaybeArray } from '@/types';

export const getArray = <T>(value: MaybeArray<T>): Array<T> => {
  return Array.isArray(value) ? value : [value];
};
