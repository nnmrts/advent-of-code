import And from "../_common/and.d.ts";
import Not from "../_common/not.d.ts";
import Or from "../_common/or.d.ts";
import SplitOptions from "../_common/split-options.d.ts";
import StringToArray from "../_common/string-to-array.d.ts";
import StringLength from "../string-length.d.ts";

import {
	IsEqualToOrNotExtendingAll,
	IsStringLiteral
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
