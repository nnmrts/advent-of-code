import pumpnEslintConfig from "@pumpn/eslint-config";

const minIdentifierLength = 2;
const maxIdentifierLength = 40;

const eslintConfig = [
	...pumpnEslintConfig,
	{
		ignores: ["./coverage/**"]
	},
	{
		rules: {
			"@stylistic/no-extra-parens": "off",
			"id-length": [
				"error",
				{
					min: minIdentifierLength,
					max: maxIdentifierLength,
					exceptions: ["x", "y", "z"],
					properties: "never"
				}
			],
			"jsdoc/convert-to-jsdoc-comments": "off",
			"jsdoc/require-description": "off",
			"jsdoc/require-param-description": "off",
			"jsdoc/require-property-description": "off",
			"jsdoc/require-returns": "off",
			"jsdoc/require-returns-description": "off",
			"jsdoc/require-throws-description": "off",
			"jsdoc/type-formatting": "off",
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
		files: ["**/*.d.ts"],
		rules: {
			"no-unused-vars": "off",
			"unicorn/require-module-specifiers": "off"
		}
	},
	{
		ignores: [
			"**/*.md/*.js",
			"**/*.jsdoc-defaults",
			"**/*.jsdoc-params",
			"**/*.jsdoc-properties"
		]
	},
	{
		files: ["**/_exports.?(*.){js,ts}"],
		rules: {
			"@eslint-react/naming-convention/filename": "off",
			"import-x/max-dependencies": "off",
			"import-x/prefer-default-export": "off"
		}
	}
];

export default eslintConfig;
