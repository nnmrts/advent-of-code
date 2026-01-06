import IsOptionalKeyOf from "./is-optional-key-of.d.ts";

/**
 * Extract all optional keys from the given type.
 *
 * This is useful when you want to create a new type that contains different type values for the optional keys only.
 *
 * @category Utilities
 */
type OptionalKeysOf<Type extends object> = Type extends unknown
	? keyof Type & (keyof { [Key in keyof Type as
		IsOptionalKeyOf<Type, Key> extends false
			? never
			: Key
		]: never
	})
	: never;

export default OptionalKeysOf;
