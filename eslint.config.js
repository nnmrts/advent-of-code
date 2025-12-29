import pumpnEslintConfig from "@pumpn/eslint-config";

const eslintConfig = [
	...pumpnEslintConfig,
	{
		rules: {
			"jsdoc/convert-to-jsdoc-comments": "off",
			"jsdoc/require-description": "off",
			"jsdoc/require-param-description": "off",
			"jsdoc/require-property-description": "off",
			"jsdoc/require-returns": "off",
			"regexp/optimal-quantifier-concatenation": [
				"error",
				{
					capturingGroups: "ignore"
				}
			],
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
