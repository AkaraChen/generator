import { ICore } from './types';
import { mergeFeature } from '@/utils/feature';
import { installDeps } from '@/utils/manager';

export function core(core: ICore) {
  const features = mergeFeature(
    ...core.options.tools,
    core.options.bundler,
    core.options.framework
  );
  installDeps(features, core.package);
}
