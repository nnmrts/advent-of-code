import NegativeInfinity from "../../_common/negative-infinity.d.ts";
import PositiveInfinity from "../../_common/positive-infinity.d.ts";

/**
 * Converts a numeric string to a number.
 *
 * @category String
 * @category Numeric
 * @category Template literal
 */
type StringToNumber<S extends string> = S extends `${infer N extends number}`
	? N
	: S extends "Infinity"
		? PositiveInfinity
		: S extends "-Infinity"
			? NegativeInfinity
			: never;

export default StringToNumber;
