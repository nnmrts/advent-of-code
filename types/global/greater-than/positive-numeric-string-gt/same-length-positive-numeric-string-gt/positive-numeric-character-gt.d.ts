import { NumericString } from "./positive-numeric-character-gt/_exports.d.ts";

/**
 * Returns a boolean for whether `A` represents a number greater than `B`, where `A` and `B` are both positive numeric characters.
 */
type PositiveNumericCharacterGt<A extends string, B extends string> = NumericString extends `${infer HeadA}${A}${infer TailA}`
	? NumericString extends `${infer HeadB}${B}${infer TailB}`
		? HeadA extends `${HeadB}${infer _}${infer __}`
			? true
			: false
		: never
	: never;

export default PositiveNumericCharacterGt;
