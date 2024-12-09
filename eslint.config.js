import pumpnEslintConfig from "@pumpn/eslint-config";

const eslintConfig = [
	...pumpnEslintConfig,
	{
		rules: {
			"@eslint-react/naming-convention/filename": "off",
			"regexp/require-unicode-sets-regexp": "error",
			"security/detect-possible-timing-attacks": "off"
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
