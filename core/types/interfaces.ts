import { Shell, Package } from '@/utils';

export interface ICoreOptions {
  framework: IFramework;
  bundler: IBundler;
  tools: Array<ITool>;
}

export interface ITool {
  devDeps: Array<string>;
  scripts: Record<string, string>;
}

export interface IFramework {
  deps: Array<string>;
  devDeps?: Array<string>;
}

export interface IBundler {
  devDeps: Array<string>;
  scripts: Record<string, string>;
}

export interface IFeature {
  deps?: Array<string>;
  devDeps?: Array<string>;
  scripts?: Record<string, string>;
}

export interface ICore {
  options: ICoreOptions;
  package: Package;
}

export interface IManagerMeta {
  isMonorepo: boolean;
}

export interface IManager {
  init(opts: IManagerMeta): Shell;
  install(name: string, opts: Partial<IManagerMeta & { dev?: boolean }>): Shell;
}
