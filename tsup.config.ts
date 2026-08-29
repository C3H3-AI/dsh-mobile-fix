import { defineConfig } from 'tsup'

export default defineConfig([
  // host half
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    platform: 'node',
    outDir: 'lib',
    clean: false,
    dts: false,
  },
  // client half (browser)
  {
    entry: { client: 'src/client/index.ts' },
    format: ['cjs'],
    platform: 'browser',
    outDir: 'lib',
    clean: false,
    dts: false,
    external: ['react', 'react-dom'],
  },
])
