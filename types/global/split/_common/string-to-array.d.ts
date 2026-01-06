/**
 * Returns an array of the characters of the string.
 *
 * @category String
 */
type StringToArray<S extends string, Result extends string[] = []> = string extends S
	? never
	: S extends `${infer F}${infer R}`
		? StringToArray<R, [...Result, F]>
		: Result;

export default StringToArray;
