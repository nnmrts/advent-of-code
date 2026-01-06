/**
 * Merges two objects without worrying about index signatures.
 */
type SimpleMerge<Destination, Source> = Source & {
	[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
};

export default SimpleMerge;
