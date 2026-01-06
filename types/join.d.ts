import { JoinableItem } from "./_common/_exports.ts";
import { NullishCoalesce } from "./join/_exports.ts";

/**
 * Join an array of strings and/or numbers using the given string as a delimiter.
 *
 * Use-case: Defining key paths in a nested object. For example, for dot-notation fields in MongoDB queries.
 *
 * @category Array
 * @category Template literal
 */
type Join<
	Items extends readonly JoinableItem[],
	Delimiter extends string = ","
> = Items extends readonly []
	? ""
	: Items extends readonly [JoinableItem?]
		? `${NullishCoalesce<Items[0], "">}`
		: Items extends readonly [
			infer First extends JoinableItem,
			...infer Tail extends readonly JoinableItem[]
		]
			? `${NullishCoalesce<First, "">}${Delimiter}${Join<Tail, Delimiter>}`
			: Items extends readonly [
				...infer Head extends readonly JoinableItem[],
				infer Last extends JoinableItem
			]
				? `${Join<Head, Delimiter>}${Delimiter}${NullishCoalesce<Last, "">}`
				: string;

export default Join;
