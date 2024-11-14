import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

export default [
  // 浏览器版本
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'SharedEcma',
        sourcemap: true
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser()
    ]
  },
  // Node.js 版本
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'lib/index.mjs',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser()
    ],
    external: [
      ...Object.keys(require('./package.json').dependencies || {}),
      ...Object.keys(require('./package.json').peerDependencies || {})
    ]
  }
] 