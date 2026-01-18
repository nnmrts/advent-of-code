import UnknownArray from "../../../_common/unknown-array.d.ts";
import IfNotAnyOrNever from "../../../if-not-any-or-never.d.ts";
import If from "../../../if.d.ts";
import And from "../../_common/and.d.ts";
import IsAny from "../../_common/is-any.d.ts";
import IsEqual from "../../_common/is-equal.d.ts";
import IsNever from "../../_common/is-never.d.ts";
import Or from "../../_common/or.d.ts";

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
