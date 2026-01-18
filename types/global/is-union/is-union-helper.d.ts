import IsNever from "../_common/is-never.d.ts";

/**
 * The actual implementation of `IsUnion`.
 */
type IsUnionHelper<T, U = T> =
	(
		IsNever<T> extends true
			? false
			: T extends any
				? [U] extends [T]
					? false
					: true
				: never
	) extends infer Result
		? boolean extends Result ? true
			: Result
		: never;

export default IsUnionHelper;
