import If from "../../../../../../if.d.ts";
import UnknownArray from "../../../../../../unknown-array.d.ts";
import IsExactOptionalPropertyTypesEnabled from "../../../../../_common/is-exact-optional-property-types-enabled.d.ts";
import OptionalKeysOf from "../../../../../_common/optional-keys-of.d.ts";

type CollapseRestElementHelper<
	TArray extends UnknownArray,
	ForwardAccumulator extends UnknownArray = [],
	BackwardAccumulator extends UnknownArray = []
> =
	TArray extends UnknownArray
		? `${number}` & keyof TArray extends never
			? TArray extends readonly [...infer Rest, infer Last]
				? CollapseRestElementHelper<
					Rest,
					ForwardAccumulator,
					[Last, ...BackwardAccumulator]
				>
				: TArray extends readonly []
					? [...ForwardAccumulator, ...BackwardAccumulator]
					: [...ForwardAccumulator, TArray[number], ...BackwardAccumulator]
			: TArray extends readonly [(infer First)?, ...infer Rest]
				? CollapseRestElementHelper<
					Rest,
					[
						...ForwardAccumulator,
						"0" extends OptionalKeysOf<TArray>
							? If<IsExactOptionalPropertyTypesEnabled, First, First | undefined>
							: First
					],
					BackwardAccumulator
				>
				: never
		: never;

export default CollapseRestElementHelper;
