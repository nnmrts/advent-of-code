import IsAny from "./global/_common/is-any.d.ts";
import IsNever from "./global/_common/is-never.d.ts";
import If from "./if.d.ts";

/**
 * An if-else-like type that resolves depending on whether the given type is `any` or `never`.
 */
type IfNotAnyOrNever<T, IfNotAnyOrNeverTemplate, IfAny = any, IfNever = never> =
	If<IsAny<T>, IfAny, If<IsNever<T>, IfNever, IfNotAnyOrNeverTemplate>>;

export default IfNotAnyOrNever;
