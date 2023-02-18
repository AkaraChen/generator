import { IBundler } from '@/types'

export const Vite: IBundler = {
    devDeps: ['vite'],
    scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
    }
}