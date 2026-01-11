import IsStringLiteral from "../split/split-helper/is-string-literal.d.ts";

/**
 * Returns an array of the characters of the string.
 *
 * For non-literal strings (including template literals with non-literal parts),
 * returns `[S]` to include the whole type without causing infinite recursion.
 *
 * @category String
 */
type StringToArray<S extends string, Result extends string[] = []> = string extends S
	? never
	: IsStringLiteral<S> extends true
		? S extends `${infer F}${infer R}`
			? StringToArray<R, [...Result, F]>
			: Result
		: [S];

export default StringToArray;
