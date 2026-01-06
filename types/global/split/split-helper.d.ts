import SplitOptions from "../_common/split-options.d.ts";

import {
	Not, Or, StringToArray
} from "./_common/_exports.ts";
import {
	And, IsEqualToOrNotExtendingAll, IsStringLiteral,
	StringLength
} from "./split-helper/_exports.ts";

type SplitHelper<
	S extends string,
	Delimiter extends string,
	Options extends Required<SplitOptions>,
	Accumulator extends string[] = []
> = S extends string
	? Delimiter extends string
		? Or<
			Not<Options["strictLiteralChecks"]>,
			Or<
				And<IsStringLiteral<S>, IsStringLiteral<Delimiter>>,
				And<
					StringLength<Delimiter> extends 1 ? true : false,
					IsEqualToOrNotExtendingAll<Delimiter, StringToArray<S>>
				>
			>
		> extends true
			? S extends `${infer Head}${Delimiter}${infer Tail}`
				? SplitHelper<Tail, Delimiter, Options, [...Accumulator, Head]>
				: Delimiter extends ""
					? S extends ""
						? Accumulator
						: [...Accumulator, S]
					: [...Accumulator, S]
			: string[]
		: never
	: never;

export default SplitHelper;
