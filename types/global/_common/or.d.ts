import If from "../../if.d.ts";

import IsNever from "./is-never.d.ts";
import { OrHelper } from "./or/_exports.d.ts";

/**
 * Returns a boolean for whether either of two given types is true.
 *
 * Use-case: Constructing complex conditional types where at least one condition must be satisfied.
 */
type Or<A extends boolean, B extends boolean> =
	OrHelper<If<IsNever<A>, false, A>, If<IsNever<B>, false, B>>;

export default Or;
