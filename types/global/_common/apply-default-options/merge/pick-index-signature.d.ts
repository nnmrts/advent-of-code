/**
 * Pick only index signatures from the given object type, leaving out all explicitly defined properties.
 *
 * This is the counterpart of `OmitIndexSignature`.
 *
 * @category Object
 */
type PickIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
		? KeyType
		: never]: ObjectType[KeyType];
};

export default PickIndexSignature;
