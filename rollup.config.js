import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'esm'
  },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    }
  ],
 plugins: [
  resolve({browser: true, jsnext: true, extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx']}),
  commonjs({include: 'node_modules/**'}),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })
 ],
 external: ['react', 'react-dom', 'react-spring']
};
