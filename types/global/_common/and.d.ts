import { AllExtend } from "./and/_exports.d.ts";

/**
 * Returns a boolean for whether two given types are both true.
 *
 * Use-case: Constructing complex conditional types where multiple conditions must be satisfied.
 */
type And<A extends boolean, B extends boolean> = AllExtend<[A, B], true>;

export default And;
