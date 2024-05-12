module.exports = {
	extends: [
		'next',
		'turbo',
		'prettier',
		'plugin:@typescript-eslint/recommended',
	],
	settings: {
		next: {
			rootDir: ['apps/*/', 'packages/*/'],
		},
	},
	rules: {
		'@next/next/no-html-link-for-pages': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		babelOptions: {
			presets: [require.resolve('next/babel')],
		},
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
};
