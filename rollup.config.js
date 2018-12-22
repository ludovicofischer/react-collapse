import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
 plugins: [
  resolve({browser: true, jsnext: true}),
  commonjs({include: 'node_modules/**'}),
  babel({
    exclude: 'node_modules/**'
  })
 ],
 external: ['react', 'react-dom', 'react-spring']
};
