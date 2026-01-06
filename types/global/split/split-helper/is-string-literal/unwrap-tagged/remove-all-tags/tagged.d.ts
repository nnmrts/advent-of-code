import Tag from "../../_common/tag.d.ts";

/**
 * Attach a "tag" to an arbitrary type. This allows you to create distinct types, that aren't assignable to one another, for distinct concepts in your program that should not be interchangeable, even if their runtime values have the same type. (See examples.)
 *
 * A type returned by `Tagged` can be passed to `Tagged` again, to create a type with multiple tags.
 *
 * [Read more about tagged types.](https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d)
 *
 * A tag's name is usually a string (and must be a string, number, or symbol), but each application of a tag can also contain an arbitrary type as its "metadata". See {@link GetTagMetadata} for examples and explanation.
 *
 * A type `A` returned by `Tagged` is assignable to another type `B` returned by `Tagged` if and only if:
 * - the underlying (untagged) type of `A` is assignable to the underlying type of `B`;
	* - `A` contains at least all the tags `B` has;
	* - and the metadata type for each of `A`'s tags is assignable to the metadata type of `B`'s corresponding tag.
 *
 * There have been several discussions about adding similar features to TypeScript. Unfortunately, nothing has (yet) moved forward:
	* - [Microsoft/TypeScript#202](https://github.com/microsoft/TypeScript/issues/202)
	* - [Microsoft/TypeScript#4895](https://github.com/microsoft/TypeScript/issues/4895)
	* - [Microsoft/TypeScript#33290](https://github.com/microsoft/TypeScript/pull/33290)
 *
 * @category Type
 */
type Tagged<
	Type,
	TagName extends PropertyKey,
	TagMetadata = never
> = Tag<TagName, TagMetadata> & Type;

export default Tagged;
