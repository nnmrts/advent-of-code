import { Whitespace } from "./_common/_exports.d.ts";

/**
 * Remove spaces from the left side.
 */
type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft<R> : V;

export default TrimLeft;
