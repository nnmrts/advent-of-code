import TagContainer from "../../../_common/tag-container.d.ts";
import IfNotAnyOrNever from "../../../if-not-any-or-never.d.ts";

import {
	CollapseLiterals,
	IsStringLiteralHelper,
	UnwrapTagged
} from "./is-string-literal/_exports.d.ts";

/**
 * Returns a boolean for whether the given type is a `string` [literal type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).
 *
 * Useful for:
 * - providing strongly-typed string manipulation functions
 * - constraining strings to be a string literal
 * - type utilities, such as when constructing parsers and ASTs
 *
 * The implementation of this type is inspired by the trick mentioned in this [StackOverflow answer](https://stackoverflow.com/a/68261113/420747).
 *
 * @category Type Guard
 * @category Utilities
 */
type IsStringLiteral<S> = IfNotAnyOrNever<S,
	IsStringLiteralHelper<CollapseLiterals<S extends TagContainer<any> ? UnwrapTagged<S> : S>>,
	false, false>;

export default IsStringLiteral;
