/* eslint-disable no-magic-numbers -- Tuple indices R[0]-R[3] access infinity check results for A/B against ±Infinity */
import IsNegative from "../_common/is-negative.d.ts";

import {
	And,
	IsEqual,
	NegativeInfinity,
	Or,
	PositiveInfinity
} from "./_common/_exports.d.ts";
import { NumberAbsolute, PositiveNumericStringGt } from "./greater-than/_exports.d.ts";

/**
 * Returns a boolean for whether a given number is greater than another number.
 */
type GreaterThan<A extends number, B extends number> =
	A extends number
		? B extends number
			? number extends A | B
				? never
				: [
					IsEqual<A, PositiveInfinity>, IsEqual<A, NegativeInfinity>,
					IsEqual<B, PositiveInfinity>, IsEqual<B, NegativeInfinity>
				] extends infer R extends [boolean, boolean, boolean, boolean]
					? Or<
						And<IsEqual<R[0], true>, IsEqual<R[2], false>>,
						And<IsEqual<R[3], true>, IsEqual<R[1], false>>
					> extends true
						? true
						: Or<
							And<IsEqual<R[1], true>, IsEqual<R[3], false>>,
							And<IsEqual<R[2], true>, IsEqual<R[0], false>>
						> extends true
							? false
							: true extends R[number]
								? false
								: [
									IsNegative<A>,
									IsNegative<B>
								] extends infer S extends [boolean, boolean]
									? [true, false] extends S
										? false
										: [false, true] extends S
											? true
											: [false, false] extends S
												? PositiveNumericStringGt<`${A}`, `${B}`>
												: PositiveNumericStringGt<`${NumberAbsolute<B>}`, `${NumberAbsolute<A>}`>
									: never
					: never
			: never
		: never;

export default GreaterThan;
