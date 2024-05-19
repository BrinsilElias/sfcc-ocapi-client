import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import aliasPlugin from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import pkg from './package.json';

const namedInput = 'lib/index.js';
const external = Object.keys(pkg.dependencies);

const buildConfig = ({
  es5, browser = true,
  minifiedVersion = true,
  alias,
  ...config
}) => {
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
      resolve({ browser }),
      commonjs(),

      minified && terser(),
      ...(es5 ? [babel({ exclude: ['node_modules/**'], babelHelpers: 'bundled' })] : []),
      ...(config.plugins || [])
    ]
  });

  const configs = [
    build({ minified: false })
  ];

  if (minifiedVersion) {
    configs.push(build({ minified: true }));
  }

  return configs;
};

export default [
  ...buildConfig({
    output: {
      file: pkg.main,
      format: 'cjs'
    }
  }),
  ...buildConfig({
    output: {
      file: pkg.module,
      format: 'es'
    }
  }),
  ...buildConfig({
    output: {
      file: pkg.browser,
      format: 'umd'
    }
  })
];
