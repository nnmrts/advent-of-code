import { RegExpExecArrayWithGroups } from "./_common/_exports.d.ts";

type RegExpWithGroups<T extends string> = Omit<RegExp, "exec"> & {
	exec(string_: string): null | RegExpExecArrayWithGroups<T>
};

export default RegExpWithGroups;
