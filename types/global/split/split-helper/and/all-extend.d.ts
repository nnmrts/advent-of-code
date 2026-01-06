import UnknownArray from "../../../../unknown-array.d.ts";
import ApplyDefaultOptions from "../../../_common/apply-default-options.d.ts";

import { AllExtendOptions } from "./_common/_exports.ts";
import {
	AllExtendHelper,
	CollapseRestElement,
	DefaultAllExtendOptions
} from "./all-extend/_exports.ts";

/**
 * Returns a boolean for whether every element in an array type extends another type.
 *
 * @category Utilities
 * @category Array
 */
type AllExtend<
	TArray extends UnknownArray,
	Type,
	Options extends AllExtendOptions = {}
> = AllExtendHelper<
	CollapseRestElement<TArray>,
	Type,
	ApplyDefaultOptions<AllExtendOptions, DefaultAllExtendOptions, Options>
>;

export default AllExtend;
