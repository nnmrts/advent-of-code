import Simplify from "../_common/simplify.d.ts";

import {
	OmitIndexSignature,
	PickIndexSignature,
	SimpleMerge
} from "./merge/_exports.d.ts";

/**
 * Merge two types into a new type. Keys of the second type overrides keys of the first type.
 *
 * @category Object
 */
type Merge<Destination, Source> =
	Simplify<
		SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>> &
		SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>>
	>;

export default Merge;
