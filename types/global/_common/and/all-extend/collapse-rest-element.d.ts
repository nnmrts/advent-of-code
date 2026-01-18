import UnknownArray from "../../../../_common/unknown-array.d.ts";
import IfNotAnyOrNever from "../../../../if-not-any-or-never.d.ts";

import { CollapseRestElementHelper } from "./collapse-rest-element/_exports.d.ts";

/**
 * Transforms a tuple type by replacing it's rest element with a single element that has the same type as the rest element, while keeping all the non-rest elements intact.
 *
 */
type CollapseRestElement<TArray extends UnknownArray> = IfNotAnyOrNever<
	TArray,
	CollapseRestElementHelper<TArray>
>;

export default CollapseRestElement;
