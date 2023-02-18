import { Package, Path, Shell } from '@/utils';
import { EManager, IFeature, IManager } from '@/types';
import { tryPaths } from './file';
import { Spawner } from './spawner';

export const npm: IManager = {
  init() {
    return new Shell('npm', ['init', '-y']);
  },
  install(name, opts) {
    return new Shell('npm', [
      'install',
      name,
      {
        '-D': opts?.dev,
      },
    ]);
  },
};

export const yarn: IManager = {
  init() {
    return new Shell('yarn', ['init', '-y']);
  },
  install(name, opts) {
    return new Shell('yarn', [
      'add',
      name,
      {
        '-D': opts?.dev,
        '-W': opts?.isMonorepo,
      },
    ]);
  },
};

export const pnpm: IManager = {
  init() {
    return new Shell('pnpm', ['init']);
  },
  install(name, opts) {
    return new Shell('pnpm', [
      'add',
      name,
      {
        '-D': opts?.dev,
        '-w': opts?.isMonorepo,
      },
    ]);
  },
};

export const bun: IManager = {
  init() {
    return new Shell('bun', ['init', '-y']);
  },
  install(name, opts) {
    return new Shell('bun', [
      'add',
      name,
      {
        '-D': opts?.dev,
        '-W': opts?.isMonorepo,
      },
    ]);
  },
};

export const Manager: Record<EManager, IManager> = {
  npm,
  yarn,
  pnpm,
  bun,
};

export const detectManager = (opts: { dir: Path }) => {
  const { dir } = opts;
  if (tryPaths(dir.join('package-lock.json'))) {
    return EManager.Npm;
  }
  if (tryPaths(dir.join('yarn.lock'))) {
    return EManager.Yarn;
  }
  if (tryPaths(dir.join('pnpm-lock.yaml'))) {
    return EManager.Pnpm;
  }
  if (tryPaths(dir.join('bun.lockb'))) {
    return EManager.Bun;
  }
  return null;
};

export const installDeps = (feature: Required<IFeature>, pkg: Package) => {
  const spawner = new Spawner(pkg.baseDir);
  const { manager } = pkg;
  feature.deps.forEach((dep) => {
    spawner.spawnSync(manager.install(dep, {}));
  });
  feature.devDeps.forEach((devDep) => {
    spawner.spawnSync(manager.install(devDep, { dev: true }));
  });
};
