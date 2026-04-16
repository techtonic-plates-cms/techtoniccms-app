import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: Deno.env.get('DEV_API_URL') + '/graphql',
	documents: [
		'../src/**/*.svelte',
		'../src/**/*.graphql',
		'../src/**/*.ts',
		'../src/**/*.remote.ts'
	],
	ignoreNoDocuments: true,
	generates: {
		'./src/': {
			preset: 'client',
			plugins: [],
			config: {
				withHooks: true,
				useTypeImports: true
			},
			presetConfig: {}
		}
	}
};

export default config;
