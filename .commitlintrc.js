module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'build',
                'env',
                'ci',
                'chore',
                'docs',
                'feature',
                'fix',
                'hotfix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
            ],
        ],
        'scope-min-length': [2, 'always', 5],
        'subject-min-length': [2, 'always', 10],
        'subject-case': [2, 'always', 'sentence-case'],
        'body-min-length': [2, 'always', 15],
    },
};
