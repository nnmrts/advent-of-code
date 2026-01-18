import { IsNegative } from "./_common/_exports.d.ts";
import IfNotAnyOrNever from "./if-not-any-or-never.d.ts";
import If from "./if.d.ts";
import { TupleOfHelper } from "./tuple-of/_exports.d.ts";

/**
 * Create a tuple type of the specified length with elements of the specified type.
 *
 * Note: If you need a readonly tuple, simply wrap this type with `Readonly`, for example, to create `readonly [number, number, number]` use `Readonly<TupleOf<3, number>>`.
 *
 * @category Array
 */
type TupleOf<Length extends number, Fill = unknown> = IfNotAnyOrNever<Length,
	TupleOfHelper<If<IsNegative<Length>, 0, Length>, Fill, []>,
	Fill[], []>;

export default TupleOf;
