import UnknownArray from "../../../_common/unknown-array.d.ts";
import IfNotAnyOrNever from "../../../if-not-any-or-never.d.ts";
import If from "../../../if.d.ts";
import IsAny from "../../_common/is-any.d.ts";
import IsNever from "../../_common/is-never.d.ts";
import Or from "../_common/or.d.ts";

import And from "./and.d.ts";

/**
 * This version fails the `equalWrappedTupleIntersectionToBeNeverAndNeverExpanded` test in `test-d/is-equal.ts`.
 */
type IsEqualHelper<A, B> = (<G>() => G extends A & G | G ? 1 : 2) extends
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

/**
 * This ignores that `" "` extends `` `${number}` ``.
 *
 * <https://github.com/microsoft/TypeScript/issues/46109>
 */
type IsEqualToOrNotExtendingAll<
	Type,
	TArray extends UnknownArray
> = IfNotAnyOrNever<
	TArray,
	If<
		IsAny<Type>,
		true,
		TArray extends readonly [infer First, ...infer Rest]
			? IsNever<First> extends true
				? IsNever<Type> extends true
					? IsEqualToOrNotExtendingAll<Type, Rest>
					: false
				: Or<
					IsEqual<Type, First>,
					Or<
						Type extends First ? false : true,
						And<
							IsEqual<Type, " ">,
							IsEqual<First, `${number}`>
						>
					>
				> extends true
					? IsEqualToOrNotExtendingAll<Type, Rest>
					: false
			: true
	>,
	false,
	false
>;

export default IsEqualToOrNotExtendingAll;
