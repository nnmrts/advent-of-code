/**
 * The builtin `join` method supports all these natively in the same way that typescript handles them so we can safely accept all of them.
 */
type JoinableItem = bigint | boolean | null | number | string | undefined;

export default JoinableItem;
