import { TrimLeft, TrimRight } from "./trim/_exports.ts";

/**
 * Remove leading and trailing spaces from a string.
 *
 * @category String
 * @category Template literal
 */
type Trim<V extends string> = TrimLeft<TrimRight<V>>;

export default Trim;
