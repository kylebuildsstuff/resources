// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    // 3rd-party libraries may not support es6 modules...
    resolve({
      jsnext: true,  // packages that try to ease the transition to es6 modules use this option
      main: true,  // the resolve will look for the 'main' file, even if it's commonJS
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',  // we don't want eslint to run on our styles
      ],
    }),
    babel({  // turns ES6 into compatible ES5 in the build/js/main.min.js
      exclude: 'node_modules/**',
    }),
  ],
};
