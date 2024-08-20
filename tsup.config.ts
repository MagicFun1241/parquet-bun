import {defineConfig} from 'tsup';

export default defineConfig({
    external: ['bun:ffi'],
    dts: true,
    sourcemap: true
});