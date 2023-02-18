import { Path, Shell } from '@/utils';
import { EManager, IManager } from '@/types';
import { existsSync } from 'fs';

export const npm: IManager = {
  init() {
    return new Shell('npm', ['init', '-y']);
  },
  install(name, opts) {
    return new Shell('npm', [
      'install',
      name,
      {
        '-D': opts.dev,
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
        '-D': opts.dev,
        '-W': opts.isMonorepo,
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
        '-D': opts.dev,
        '-w': opts.isMonorepo,
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
        '-D': opts.dev,
        '-W': opts.isMonorepo,
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

export function tryPaths(...paths: Path[]) {
  for (const path of paths) {
    if (existsSync(path.value)) return path;
  }
  return null;
}
