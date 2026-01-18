import If from "../../if.d.ts";

import { Simplify } from "./_common/_exports.d.ts";
import { Merge, RequiredKeysOf } from "./apply-default-options/_exports.d.ts";
import IsAny from "./is-any.d.ts";
import IsNever from "./is-never.d.ts";
import OptionalKeysOf from "./optional-keys-of.d.ts";

/**
 * Merges user specified options with default options.
 *
 */
type ApplyDefaultOptions<
	Options extends object,
	Defaults extends Simplify<
		Omit<
			Required<Options>,
			RequiredKeysOf<Options>
		> &
		Partial<Record<RequiredKeysOf<Options>, never>>
	>,
	SpecifiedOptions extends Options
> = If<
	IsAny<SpecifiedOptions>,
	Defaults,
	If<
		IsNever<SpecifiedOptions>,
		Defaults,
		Simplify<Merge<Defaults, {
			[Key in keyof SpecifiedOptions
			as Key extends OptionalKeysOf<Options>
				? undefined extends SpecifiedOptions[Key]
					? never
					: Key
				: Key
			]: SpecifiedOptions[Key]
		}> & Required<Options>>
	>
>;

export default ApplyDefaultOptions;
