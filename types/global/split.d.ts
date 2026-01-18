import { ApplyDefaultOptions, SplitOptions } from "./_common/_exports.d.ts";
import { DefaultSplitOptions, SplitHelper } from "./split/_exports.d.ts";

/**
 * Represents an array of strings split using a given character or character set.
 *
 * Use-case: Defining the return type of a method like `String.prototype.split`.
 *
 * @category String
 * @category Template literal
 */
type Split<
	S extends string,
	Delimiter extends string,
	Options extends SplitOptions = {}
> = SplitHelper<S, Delimiter, ApplyDefaultOptions<SplitOptions, DefaultSplitOptions, Options>>;

export default Split;
