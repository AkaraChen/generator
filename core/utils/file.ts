import { Path } from './path';
import { existsSync } from 'fs';

export function tryPaths(...paths: Path[]) {
  for (const path of paths) {
    if (existsSync(path.value)) return path;
  }
  return null;
}
