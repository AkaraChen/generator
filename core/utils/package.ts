import { PackageJson } from 'type-fest';
import { Path } from './path';

export class Package {
  baseDir: Path;
  json: PackageJson = {};
  #jsonPath: Path;
  constructor(baseDir: string) {
    this.baseDir = new Path(baseDir);
    this.#jsonPath = this.baseDir.join('package.json');
  }
}
