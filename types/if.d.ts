import IsNever from "./global/_common/is-never.d.ts";

/**
 * An if-else-like type that resolves depending on whether the given `boolean` type is `true` or `false`.
 *
 * Use-cases:
 * - You can use this in combination with `Is*` types to create an if-else-like experience. For example, `If<IsAny<any>, 'is any', 'not any'>`.
 *
 * Note:
 * - Returns a union of if branch and else branch if the given type is `boolean` or `any`. For example, `If<boolean, 'Y', 'N'>` will return `'Y' | 'N'`.
 * - Returns the else branch if the given type is `never`. For example, `If<never, 'Y', 'N'>` will return `'N'`.
 *
 * @category Type Guard
 * @category Utilities
 */
type If<Type extends boolean, IfBranch, ElseBranch> =
	IsNever<Type> extends true
		? ElseBranch
		: Type extends true
			? IfBranch
			: ElseBranch;

export default If;
