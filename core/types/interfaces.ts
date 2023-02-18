import {
  EFramework,
  EProjectType,
  EAppBundler,
  ELibraryBundler,
} from './enums';
import { Shell, Package } from '@/utils';

export interface ICoreOptions<type> {
  type: EProjectType;
  framework: EFramework;
  bundler: type extends EProjectType.App ? EAppBundler : ELibraryBundler;
}

export interface ITool {
  devDeps: Array<string>;
  scripts: Record<string, string>;
}

export interface IFramework {
  deps: Array<string>;
  devDeps?: Array<string>
}

export interface IBundler {
  devDeps: Array<string>;
  scripts: Record<string, string>;
}

export interface ICore<type> {
  options: ICoreOptions<type>;
  package: Package;
}

export interface IManagerMeta {
  isMonorepo: boolean;
}

export interface IManager {
  init(opts: IManagerMeta): Shell;
  install(name: string, opts: IManagerMeta & { dev: boolean }): Shell;
}
