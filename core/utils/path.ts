import { join } from 'node:path';

export function winPath(path: string) {
  if (/^\\\\\?\\/.test(path)) {
    return path;
  }
  return path.replace(/\\/g, '/');
}

export class Path {
  value: string;
  constructor(path: string) {
    this.value = winPath(path);
  }
  join(...path: Array<string>) {
    return new Path(join(this.value, ...path));
  }
}
