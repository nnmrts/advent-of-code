type RegExpExecArrayWithGroups<T extends string> = null | (Omit<RegExpExecArray, "groups"> & { groups: { [name in T]: string | undefined } });

export default RegExpExecArrayWithGroups;
