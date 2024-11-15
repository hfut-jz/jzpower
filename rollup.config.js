import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from 'rollup-plugin-postcss';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';

const overrides = {
    compilerOptions: { declaration: true },
    exclude: ["src/**/*.test.tsx", "src/**/*.stories.tsx", "src/**/*.stories.mdx", "src/setupTests.ts"]
};

const config = {
    input: 'src/index.tsx',
    output: [{
        file: 'dist/index.es.js',
        format: 'es'
    }],
    plugins: [
        json(),
        nodeResolve(),
        typescript({
            tsconfig: "tsconfig.json",
            tsconfigOverride: overrides
        }),
        commonjs(),
        excludeDependenciesFromBundle(),
        postcss({
            extensions: ['.css', '.scss'],
            use: [
                ['sass', { includePaths: ['./src/styles'] }]
            ],
            extract: true // 提取 CSS 到独立文件
        })
    ],
    external: ['react', 'react-dom','axios']
};

export default config;
