// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                'browser': true,
                'process': true,
            },
        },
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/quotes': [ 'error', 'single' ],
            '@stylistic/indent': [ 'error', 4 ],
            '@stylistic/array-bracket-spacing': [ 'error', 'always', {
                'arraysInArrays': false,
                'objectsInArrays': false,
            }],
            '@stylistic/semi': [ 'error', 'always' ],
            '@stylistic/comma-dangle': [ 'error', {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'always-multiline',
                'exports': 'always-multiline',
                'functions': 'always-multiline',
            }],
        },
    },
);
