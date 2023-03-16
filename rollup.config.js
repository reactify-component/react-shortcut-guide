// @ts-check
import * as esbuild_ from 'rollup-plugin-esbuild'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const { minify } = esbuild_

const packageJson = require('./package.json')

const globals = {
  // @ts-ignore
  ...packageJson.dependencies,
}

const dir = 'dist'

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/index.ts',
    // ignore lib
    external: [
      'react',
      'react-dom',
      'lodash',
      'lodash-es',
      ...Object.keys(globals),
    ],

    output: [
      {
        file: `${dir}/index.cjs.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${dir}/index.cjs.min.js`,
        format: 'cjs',
        sourcemap: true,
        plugins: [minify()],
      },
      {
        file: `${dir}/index.esm.mjs`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `${dir}/index.esm.min.mjs`,
        format: 'es',
        sourcemap: true,
        plugins: [minify()],
      },
    ],
    plugins: [
      nodeResolve(),
      postcss({
        // config: './postcss.config.js',
        minimize: true,
      }),
      commonjs({ include: 'node_modules/**' }),
      typescript({
        tsconfig: './src/tsconfig.json',
        declaration: false,
        jsx: 'react',
      }),
      // esbuild({
      //   include: /\.[jt]sx?$/,
      //   exclude: /node_modules/,
      //   sourceMap: false,
      //   minify: process.env.NODE_ENV === 'production',
      //   target: 'es2017',
      //   jsxFactory: 'React.createElement',
      //   jsxFragment: 'React.Fragment',
      //   define: {
      //     __VERSION__: '"x.y.z"',
      //   },
      //   tsconfig: './src/tsconfig.json',
      //   loaders: {
      //     '.json': 'json',
      //     '.js': 'jsx',
      //   },
      // }),
      // @ts-ignore
      peerDepsExternal(),
    ],

    treeshake: true,
  },
]

export default config
