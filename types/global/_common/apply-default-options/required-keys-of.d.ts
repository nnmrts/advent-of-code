import OptionalKeysOf from "../optional-keys-of.d.ts";

/**
 * Extract all required keys from the given type.
 *
 * This is useful when you want to create a new type that contains different type values for the required keys only or use the list of keys for validation purposes, etc...
 *
 * @category Utilities
 */
type RequiredKeysOf<Type extends object> = Type extends unknown
	? Exclude<keyof Type, OptionalKeysOf<Type>>
	: never;

export default RequiredKeysOf;
