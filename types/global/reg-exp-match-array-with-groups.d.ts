type RegExpMatchArrayWithGroups<T extends string> = null | (Omit<RegExpMatchArray, "groups"> & { groups: { [name in T]: string | undefined } });

export default RegExpMatchArrayWithGroups;
