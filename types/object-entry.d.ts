type ObjectEntry<BaseType> = {
	[K in keyof BaseType]: [K, BaseType[K]]
}[keyof BaseType];

export default ObjectEntry;
