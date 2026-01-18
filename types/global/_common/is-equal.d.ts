import { IsEqualHelper } from "./is-equal/_exports.d.ts";

/**
 * Returns a boolean for whether the two given types are equal.
 *
 * {@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650}
 * {@link https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796}
 *
 * Use-cases:
 * - If you want to make a conditional branch based on the result of a comparison of two types.
 *
 * @category Type Guard
 * @category Utilities
 */
type IsEqual<A, B> =
	[A] extends [B]
		? [B] extends [A]
			? IsEqualHelper<A, B>
			: false
		: false;

export default IsEqual;
