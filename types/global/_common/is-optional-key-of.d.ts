import IsAny from "./is-any.d.ts";

/**
 * Returns a boolean for whether the given key is an optional key of type.
 *
 * This is useful when writing utility types or schema validators that need to differentiate `optional` keys.
 *
 * @category Type Guard
 * @category Utilities
 */
type IsOptionalKeyOf<Type extends object, Key extends keyof Type> =
	IsAny<Key | Type> extends true ? never
		: Key extends keyof Type
			? Type extends Record<Key, Type[Key]>
				? false
				: true
			: false;

export default IsOptionalKeyOf;
