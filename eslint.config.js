import pumpnEslintConfig from "@pumpn/eslint-config";

const eslintConfig = [
	...pumpnEslintConfig,
	{
		rules: {
			"tailwindcss/classnames-order": "off",
			"tailwindcss/enforces-negative-arbitrary-values": "off",
			"tailwindcss/enforces-shorthand": "off",
			"tailwindcss/migration-from-tailwind-2": "off",
			"tailwindcss/no-arbitrary-value": "off",
			"tailwindcss/no-contradicting-classname": "off",
			"tailwindcss/no-custom-classname": "off",
			"tailwindcss/no-unnecessary-arbitrary-value": "off"
		}
	},
	{
		files: ["**/*.doc.js"],
		rules: {
			"import-x/unambiguous": "off",
			"unicorn/no-empty-file": "off",
			"unicorn/prevent-abbreviations": "off"
		}
	},
	{
		ignores: [
			"**/*.md/*.js",
			"**/*.jsdoc-defaults",
			"**/*.jsdoc-params",
			"**/*.jsdoc-properties"
		]
	}
];

export default eslintConfig;
