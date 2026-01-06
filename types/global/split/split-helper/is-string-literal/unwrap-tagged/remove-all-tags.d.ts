import tag from "../../_common/tag.d.ts";
import Tag from "../_common/tag.d.ts";

import { Tagged } from "./remove-all-tags/_exports.ts";

type RemoveAllTags<T> = T extends Tag<PropertyKey, any>
	? {
		[ThisTag in keyof T[typeof tag]]: T extends Tagged<
			infer Type,
			ThisTag, T[typeof tag][ThisTag]
		>
			? RemoveAllTags<Type>
			: never
	}[keyof T[typeof tag]]
	: T;

export default RemoveAllTags;
