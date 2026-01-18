import TupleOf from "../../tuple-of.d.ts";
import StringLength from "../string-length.d.ts";

import { SameLengthPositiveNumericStringGt } from "./positive-numeric-string-gt/_exports.d.ts";

/**
 * Returns a boolean for whether `A` is greater than `B`, where `A` and `B` are both positive numeric strings.
 */
type PositiveNumericStringGt<A extends string, B extends string> = A extends B
	? false
	: [
		TupleOf<StringLength<A>, 0>,
		TupleOf<StringLength<B>, 0>
	] extends infer R extends [readonly unknown[], readonly unknown[]]
		? R[0] extends [...R[1], ...infer Remain extends readonly unknown[]]
			? 0 extends Remain["length"]
				? SameLengthPositiveNumericStringGt<A, B>
				: true
			: false
		: never;

export default PositiveNumericStringGt;
