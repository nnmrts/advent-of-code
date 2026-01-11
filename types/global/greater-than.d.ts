/* eslint-disable no-magic-numbers */
/* eslint-disable no-loss-of-precision */

import UnknownArray from "../_common/unknown-array.d.ts";
import IfNotAnyOrNever from "../if-not-any-or-never.d.ts";
import If from "../if.d.ts";

import {
	And,
	Or
} from "./_common/_exports.ts";
import StringLength from "./string-length.d.ts";

type IsEqualHelper<A, B> =
	(<G>() => G extends A & G | G ? 1 : 2) extends
	(<G>() => G extends B & G | G ? 1 : 2)
		? true
		: false;

/**
 * Returns a boolean for whether the two given types are equal.
 *
 * {@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650}
 * {@link https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796}
 *
 * Use-cases:
 * - If you want to make a conditional branch based on the result of a comparison of two types.
 *
 * @category Type Guard
 * @category Utilities
 */
type IsEqual<A, B> =
	[A] extends [B]
		? [B] extends [A]
			? IsEqualHelper<A, B>
			: false
		: false;

type TupleOfHelper<L extends number, Fill, Accumulator extends UnknownArray> = number extends L
	? Fill[]
	: L extends Accumulator["length"]
		? Accumulator
		: TupleOfHelper<L, Fill, [...Accumulator, Fill]>;

type Numeric = bigint | number;

type Zero = 0 | 0n;

/**
 * A negative `number`/`bigint` (`-∞ < x < 0`)
 *
 * Use-case: Validating and documenting parameters.
 *
 * @category Numeric
 */
type Negative<T extends Numeric> = T extends Zero ? never : `${T}` extends `-${string}` ? T : never;

/**
 * Returns a boolean for whether the given number is a negative number.
 *
 * @category Numeric
 */
type IsNegative<T extends Numeric> = T extends Negative<T> ? true : false;

/**
 * Create a tuple type of the specified length with elements of the specified type.
 *
 * Note: If you need a readonly tuple, simply wrap this type with `Readonly`, for example, to create `readonly [number, number, number]` use `Readonly<TupleOf<3, number>>`.
 *
 * @category Array
 */
type TupleOf<Length extends number, Fill = unknown> = IfNotAnyOrNever<Length,
	TupleOfHelper<If<IsNegative<Length>, 0, Length>, Fill, []>,
	Fill[], []>;

/**
 * Matches the hidden `Infinity` type.
 *
 * Please upvote [this issue](https://github.com/microsoft/TypeScript/issues/32277) if you want to have this type as a built-in in TypeScript.
 *
 * @category Numeric
 */
type PositiveInfinity = 1e999;

/**
 * Matches the hidden `-Infinity` type.
 *
 * Please upvote [this issue](https://github.com/microsoft/TypeScript/issues/32277) if you want to have this type as a built-in in TypeScript.
 *
 * @category Numeric
 */
type NegativeInfinity = -1e999;

type NumericString = "0123456789";

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

/**
 * Returns a boolean for whether `A` represents a number greater than `B`, where `A` and `B` are both numeric strings and have the same length.
 */
type SameLengthPositiveNumericStringGt<A extends string, B extends string> = A extends `${infer FirstA}${infer RestA}`
	? B extends `${infer FirstB}${infer RestB}`
		? FirstA extends FirstB
			? SameLengthPositiveNumericStringGt<RestA, RestB>
			: PositiveNumericCharacterGt<FirstA, FirstB>
		: never
	: false;

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

/**
 * Returns the absolute value of a given value.
 */
type NumberAbsolute<N extends number> = `${N}` extends `-${infer StringPositiveN}` ? StringToNumber<StringPositiveN> : N;

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
