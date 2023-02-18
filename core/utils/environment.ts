import { Path } from './path';
import { detectManager, Manager } from './manager';
import fs from 'node:fs';
import { PackageJson } from 'type-fest';
import { Package } from './package';
import { EManager } from '@/types';
import { tryPaths } from './file';

export const detectMonorepo = (baseDir: Path) => {
  return (
    !!tryPaths(
      baseDir.join('lerna.json'),
      baseDir.join('pnpm-workspace.yaml')
    ) ||
    JSON.parse(
      fs.readFileSync(baseDir.join('package.json').value, 'utf-8').toString()
    )
  );
};

export const detectPackage = (baseDir: Path) => {
  const pkgDir = baseDir.join('package.json');
  const pkgJSON: PackageJson = JSON.parse(
    fs.readFileSync(pkgDir.value, 'utf-8').toString()
  );
  const initialized = !!tryPaths(pkgDir);
  const monorepo = detectMonorepo(baseDir) || !!pkgJSON.workspaces;
  const manager = detectManager({ dir: baseDir }) || EManager.Pnpm;
  return new Package(baseDir, {
    initialized,
    monorepo,
    manager: Manager[manager],
  });
};
