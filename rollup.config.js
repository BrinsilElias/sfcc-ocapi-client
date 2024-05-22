import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import aliasPlugin from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const namedInput = 'lib/index.js';
const external = Object.keys(pkg.dependencies);

const isProduction = process.env.NODE_ENV === 'production';

const buildConfig = ({ minifiedVersion = true, alias, envName, ...config }) => {
  const { file } = config.output;
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  const extArr = ext.split('.');
  extArr.shift();

  const build = ({ minified }) => ({
    input: namedInput,
    external,
    ...config,
    output: {
      ...config.output,
      file: `${path.dirname(file)}/${basename}.${(minified ? ['min', ...extArr] : extArr).join('.')}`
    },
    plugins: [
      aliasPlugin({
        entries: alias || []
      }),
      resolve(),
      commonjs(),

      minified && terser(),
      ...[
        babel({
          exclude: ['node_modules/**'],
          babelHelpers: 'runtime',
          envName: envName || 'production'
        })
      ],
      ...(config.plugins || [])
    ]
  });

  const configs = [build({ minified: false })];

  if (minifiedVersion && isProduction) {
    configs.push(build({ minified: true }));
  }

  return configs;
};

export default [
  ...buildConfig({
    output: {
      file: pkg.main,
      format: 'umd',
      name: 'sfcc-ocapi-client',
      sourcemap: isProduction
    },
    envName: 'production'
  }),
  ...buildConfig({
    output: {
      file: pkg.exports['.'].require,
      format: 'cjs',
      sourcemap: isProduction
    },
    minifiedVersion: false,
    envName: 'node'
  }),
  ...buildConfig({
    output: {
      file: pkg.exports['.'].import,
      format: 'esm',
      sourcemap: isProduction
    },
    minifiedVersion: false,
    envName: 'node'
  })
];
