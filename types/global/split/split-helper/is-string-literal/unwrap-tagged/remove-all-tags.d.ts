import tagSymbol from "../../../../../_common/tag-symbol.d.ts";
import Tag from "../../../../../_common/tag.d.ts";
import Tagged from "../../../../../tagged.d.ts";

type RemoveAllTags<T> = T extends Tag<PropertyKey, any>
	? {
		[ThisTag in keyof T[typeof tagSymbol]]: T extends Tagged<
			infer Type,
			ThisTag, T[typeof tagSymbol][ThisTag]
		>
			? RemoveAllTags<Type>
			: never
	}[keyof T[typeof tagSymbol]]
	: T;

export default RemoveAllTags;
