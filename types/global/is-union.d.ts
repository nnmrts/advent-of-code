import { IsUnionHelper } from "./is-union/_exports.ts";

/**
 * Returns a boolean for whether the given type is a union.
 */
type IsUnion<T> = IsUnionHelper<T>;

export default IsUnion;
