import { Path } from './path';
import { Shell } from './shell';
import spawn from 'cross-spawn';

export class Spawner {
  baseDir: Path;
  constructor(baseDir: Path) {
    this.baseDir = baseDir;
  }
  spawnSync(shell: Shell) {
    return spawn.sync(shell.name, shell.args, {
      cwd: this.baseDir.value,
      stdio: shell.needInput ? 'inherit' : 'ignore',
    });
  }
}
