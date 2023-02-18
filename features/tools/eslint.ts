import { ITool } from '@/types';

export const ESlint: ITool = {
  devDeps: ['eslint'],
  scripts: {
    lint: 'eslint .',
    'lint:fix': 'eslint . --fix',
  },
};
