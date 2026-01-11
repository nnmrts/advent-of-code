import Tag from "../../../../_common/tag.d.ts";

import { RemoveAllTags } from "./unwrap-tagged/_exports.ts";

/**
 * Revert a tagged type back to its original type by removing all tags.
 *
 * Why is this necessary?
 *
 * 1. Use a `Tagged` type as object keys
 * 2. Prevent TS4058 error: "Return type of exported function has or is using name X from external module Y but cannot be named"
 *
 * @category Type
 */
type UnwrapTagged<TaggedType extends Tag<PropertyKey, any>> =
	RemoveAllTags<TaggedType>;

export default UnwrapTagged;
