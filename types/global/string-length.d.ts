import StringToArray from "./_common/string-to-array.d.ts";

/**
 * Returns the length of the given string.
 *
 * @category String
 * @category Template literal
 */
type StringLength<S extends string> = string extends S
	? never
	: StringToArray<S>["length"];

export default StringLength;
