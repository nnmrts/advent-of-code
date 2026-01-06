import JoinableItem from "../_common/joinable-item.d.ts";

/**
 * `null` and `undefined` are treated uniquely in the built-in join method, in a way that differs from the default `toString` that would result in the type `${undefined}`. That's why we need to handle it specifically with this helper.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join#description
 */
type NullishCoalesce<
	Value extends JoinableItem,
	Fallback extends string
> = Value extends null | undefined ? Fallback | NonNullable<Value> : Value;

export default NullishCoalesce;
