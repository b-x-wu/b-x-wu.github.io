// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import reactlint from 'eslint-plugin-react';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                'browser': true,
                'process': true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@stylistic': stylistic,
            'react': reactlint,
        },
        settings: {
            'react': {
                'version': 'detect',
            },
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
            ...reactlint.configs.recommended.rules,
        },
    },
);
