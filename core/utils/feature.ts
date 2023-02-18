import { IFeature } from '@/types';

export function mergeFeature(...features: Array<IFeature>) {
  return features.reduce(
    (acc: Required<IFeature>, cur) => {
      if (cur.deps) acc.deps.push(...cur.deps);
      if (cur.devDeps) acc.devDeps.push(...cur.devDeps);
      acc.scripts = { ...acc.scripts, ...cur.scripts };
      return acc;
    },
    {
      deps: [],
      devDeps: [],
      scripts: {},
    }
  );
}
