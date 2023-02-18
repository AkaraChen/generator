import { getArray, MaybeArray } from '@/types';

export class Shell {
  raw: string;
  needInput: boolean;
  constructor(
    name: string,
    args: Parameters<typeof argsx>[0],
    opts?: { needInput?: boolean }
  ) {
    this.raw = name + ' ' + argsx(args).join(' ');
    this.needInput = opts?.needInput || false;
  }
}

export function argsx(args: MaybeArray<string | Record<string, any>>) {
  return getArray(args).map((arg) => {
    if (typeof arg === 'string') return arg.trim();
    if (typeof arg === 'object') {
      const array: Array<string> = [];
      Object.entries(arg).forEach(([key, value]) => {
        if (value) array.push(key);
      });
      return array.join(' ');
    } else {
      throw new Error('Invalid args');
    }
  });
}
