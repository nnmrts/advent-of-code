import UnknownArray from "../../../../_common/unknown-array.d.ts";
import IfNotAnyOrNever from "../../../../if-not-any-or-never.d.ts";
import If from "../../../../if.d.ts";
import IsAny from "../../is-any.d.ts";
import IsNever from "../../is-never.d.ts";
import Not from "../../not.d.ts";
import Or from "../../or.d.ts";
import AllExtendOptions from "../_common/all-extend-options.d.ts";

type AllExtendHelper<
	TArray extends UnknownArray,
	Type,
	Options extends Required<AllExtendOptions>
> = IfNotAnyOrNever<TArray, If<IsAny<Type>, true,
	TArray extends readonly [infer First, ...infer Rest]
		? IsNever<First> extends true
			? Or<IsNever<Type>, Not<Options["strictNever"]>> extends true
				? AllExtendHelper<Rest, Type, Options>
				: false
			: First extends Type
				? AllExtendHelper<Rest, Type, Options>
				: false
		: true
>, false, false>;

export default AllExtendHelper;
