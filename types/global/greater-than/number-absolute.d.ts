import { StringToNumber } from "./number-absolute/_exports.d.ts";

/**
 * Returns the absolute value of a given value.
 */
type NumberAbsolute<N extends number> = `${N}` extends `-${infer StringPositiveN}`
	? StringToNumber<StringPositiveN>
	: N;

export default NumberAbsolute;
