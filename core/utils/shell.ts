import { MaybeArray } from '@/types';
import { getArray } from './others';

export class Shell {
  get raw() {
    return [this.name, ...this.args].join(' ');
  }
  needInput: boolean;
  name: string;
  args: Array<string>;
  constructor(
    name: string,
    args: Parameters<typeof argsx>[0],
    opts?: { needInput?: boolean }
  ) {
    (this.name = name), (this.args = argsx(args));
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
