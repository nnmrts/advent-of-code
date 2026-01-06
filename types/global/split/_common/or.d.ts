import If from "../../../if.d.ts";

/**
 * Returns a boolean for whether the given type is `never`.
 * {@link https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919}
 * {@link https://stackoverflow.com/a/53984913/10292952}
 * {@link https://www.zhenghao.io/posts/ts-never}
 * Useful in type utilities, such as checking if something does not occur.
 *
 * @category Type Guard
 * @category Utilities
 */
type IsNever<T> = [T] extends [never] ? true : false;

type OrHelper<A extends boolean, B extends boolean> = A extends true
	? true
	: B extends true
		? true
		: false;

/**
 * Returns a boolean for whether either of two given types is true.
 *
 * Use-case: Constructing complex conditional types where at least one condition must be satisfied.
 */
type Or<A extends boolean, B extends boolean> =
	OrHelper<If<IsNever<A>, false, A>, If<IsNever<B>, false, B>>;

export default Or;
