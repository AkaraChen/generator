import { ICore } from './types';
import { mergeFeature } from '@/utils/feature';
import { installDeps } from './utils/manager';

export function core<type>(core: ICore<type>) {
  const features = mergeFeature(
    ...core.options.tools,
    core.options.bundler,
    core.options.framework
  );
  installDeps(features, core.package);
}
