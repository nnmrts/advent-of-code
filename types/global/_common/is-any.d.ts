/**
 * Returns a boolean for whether the given type is `any`.
 *
 * {@link https://stackoverflow.com/a/49928360/1490091}
 *
 * Useful in type utilities, such as disallowing `any`s to be passed to a function.
 *
 * @category Type Guard
 * @category Utilities
 */
type IsAny<T> = 0 extends 1 & NoInfer<T> ? true : false;

export default IsAny;
