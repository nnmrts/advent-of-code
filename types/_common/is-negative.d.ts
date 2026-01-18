type Numeric = bigint | number;

type Zero = 0 | 0n;

/**
 * A negative `number`/`bigint` (`-∞ < x < 0`)
 *
 * Use-case: Validating and documenting parameters.
 *
 * @category Numeric
 */
type Negative<T extends Numeric> = T extends Zero ? never : `${T}` extends `-${string}` ? T : never;

/**
 * Returns a boolean for whether the given number is a negative number.
 *
 * @category Numeric
 */
type IsNegative<T extends Numeric> = T extends Negative<T> ? true : false;

export default IsNegative;
