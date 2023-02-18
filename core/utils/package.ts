import { IManager } from '@/types';
import { PackageJson } from 'type-fest';
import { Path } from './path';

export class Package {
  baseDir: Path;
  json: PackageJson = {};
  initialized: boolean;
  monorepo: boolean;
  manager: IManager;
  constructor(
    baseDir: Path,
    opts: {
      initialized?: boolean;
      monorepo?: boolean;
      manager: IManager;
    }
  ) {
    this.baseDir = baseDir;
    this.initialized = opts.initialized || false;
    this.monorepo = opts.monorepo || false;
    this.manager = opts.manager;
  }
}
