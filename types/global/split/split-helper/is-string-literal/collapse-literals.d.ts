/**
 * Collapses literal types in a union into their corresponding primitive types, when possible. For example, `CollapseLiterals<'foo' | 'bar' | (string & {})>` returns `string`.
 *
 * Note: This doesn't collapse literals within tagged types. For example, `CollapseLiterals<Tagged<'foo' | (string & {}), 'Tag'>>` returns `("foo" & Tag<"Tag", never>) | (string & Tag<"Tag", never>)` and not `string & Tag<"Tag", never>`.
 *
 * Use-case: For collapsing unions created using {@link LiteralUnion}.
 */
type CollapseLiterals<T> = {} extends T
	? T
	: T extends infer U & {}
		? U
		: T;

export default CollapseLiterals;
