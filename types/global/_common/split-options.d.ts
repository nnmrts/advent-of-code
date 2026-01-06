type SplitOptions = {

	/**
	 * When enabled, instantiations with non-literal string types (e.g., `string`, `Uppercase<string>`, `on${string}`) simply return back `string[]` without performing any splitting, as the exact structure cannot be statically determined.
	 *
	 * @default true
	 */
	strictLiteralChecks?: boolean
};

export default SplitOptions;
