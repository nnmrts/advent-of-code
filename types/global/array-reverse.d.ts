import UnknownArray from "../_common/unknown-array.d.ts";
import IfNotAnyOrNever from "../if-not-any-or-never.d.ts";
import If from "../if.d.ts";

import {
	IsExactOptionalPropertyTypesEnabled,
	IsNever,
	IsOptionalKeyOf
} from "./_common/_exports.d.ts";

/**
 * Returns whether the given array `T` is readonly.
 */
type IsArrayReadonly<T extends UnknownArray> = If<
	IsNever<T>,
	false,
	T extends unknown[] ? false : true
>;

type ArrayReverseHelper<
	TArray extends UnknownArray,
	BeforeRestAccumulator extends UnknownArray = [],
	AfterRestAccumulator extends UnknownArray = [],
	Result extends UnknownArray = never
> =
	`${number}` & keyof TArray extends never
		? TArray extends readonly [...infer Rest, infer Last]
			? ArrayReverseHelper<
				Rest,
				BeforeRestAccumulator,
				[...AfterRestAccumulator, Last],
				Result
			>
			: [...AfterRestAccumulator, ...TArray, ...BeforeRestAccumulator] | Result
		: TArray extends readonly [(infer First)?, ...infer Rest]
			? IsOptionalKeyOf<TArray, "0"> extends true
				? ArrayReverseHelper<
					Rest,
					[
						First | (If<IsExactOptionalPropertyTypesEnabled, never, undefined>),
						...BeforeRestAccumulator
					],
					AfterRestAccumulator,
					BeforeRestAccumulator | Result
				>
				: ArrayReverseHelper<
					Rest,
					[First, ...BeforeRestAccumulator],
					AfterRestAccumulator,
					Result
				>
			: never;

/**
 * Reverse the order of elements in a tuple type.
 *
 * @category Array
 */
type ArrayReverse<TArray extends UnknownArray> = IfNotAnyOrNever<TArray,
	TArray extends unknown
		? ArrayReverseHelper<TArray> extends infer Result
			? If<IsArrayReadonly<TArray>, Readonly<Result>, Result>
			: never
		: never>;

export default ArrayReverse;
