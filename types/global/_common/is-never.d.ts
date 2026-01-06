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

export default IsNever;
