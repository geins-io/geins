import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript(),
  ],
};
