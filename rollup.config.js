import typescript from 'rollup-plugin-typescript';

export default {
    entry: './src/index.tsx',
    dest: 'dest/index.js',
    format: 'iife',
    sourceMap: 'inline',

    plugins: [
            typescript({
                jsx: 'react'
            })
    ]
};