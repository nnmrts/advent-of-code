/* eslint-disable no-magic-numbers -- 1e999 is the only way to express TypeScript's hidden Infinity type */
/* eslint-disable no-loss-of-precision -- Overflow to -Infinity is intentional */

/**
 * Matches the hidden `-Infinity` type.
 *
 * Please upvote [this issue](https://github.com/microsoft/TypeScript/issues/32277) if you want to have this type as a built-in in TypeScript.
 *
 * @category Numeric
 */
type NegativeInfinity = -1e999;

export default NegativeInfinity;
