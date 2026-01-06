/**
 * Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.
 *
 * {@link https://github.com/microsoft/TypeScript/issues/15300}
 *
 * @category Object
 */
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export default Simplify;
