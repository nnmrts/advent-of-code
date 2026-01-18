import { ApplyDefaultOptions } from "./_common/_exports.ts";

type ReplaceOptions = {
	all?: boolean
};

type DefaultReplaceOptions = {
	all: false
};

type ReplaceHelper<
	Input extends string,
	Search extends string,
	Replacement extends string,
	Options extends Required<ReplaceOptions>,
	Accumulator extends string = ""
> = Search extends string
	? Replacement extends string
		? Input extends `${infer Head}${Search}${infer Tail}`
			? Options["all"] extends true
				? ReplaceHelper<Tail, Search, Replacement, Options, `${Accumulator}${Head}${Replacement}`>
				: `${Head}${Replacement}${Tail}`
			: `${Accumulator}${Input}`
		: never
	: never;

/**
 * Represents a string with some or all matches replaced by a replacement.
 *
 * Use-case:
 * - `kebab-case-path` to `dotted.path.notation`
 * - Changing date/time format: `01-08-2042` → `01/08/2042`
 * - Manipulation of type properties, for example, removal of prefixes
 *
 * @category String
 * @category Template literal
 */
type Replace<
	Input extends string,
	Search extends string,
	Replacement extends string,
	Options extends ReplaceOptions = {}
> = ReplaceHelper<
	Input,
	Search,
	Replacement,
	ApplyDefaultOptions<
		ReplaceOptions,
		DefaultReplaceOptions,
		Options
	>
>;

export default Replace;
