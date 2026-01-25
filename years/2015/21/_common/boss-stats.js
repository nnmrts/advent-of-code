import getInput from "../../../_common/get-input.js";
import mapValues from "../../_common/map-values.js";

/**
 * @import RegExpWithGroups from "../../../../types/reg-exp-with-groups.d.ts";
 */

const input = await getInput();

const trimmedInput = input.trim();

/**
 * @typedef {RegExpWithGroups<"hitPoints"|"damage"|"armor">} Regex
 */

const regex = /** @type {Regex} */ (
	/^Hit Points: (?<hitPoints>\d+)\nDamage: (?<damage>\d+)\nArmor: (?<armor>\d+)$/v
);

const match = trimmedInput.match(regex);

if (match === null) {
	throw new Error(`no match for ${regex} found`);
}

const bossStats = mapValues(match.groups, Number);

export default bossStats;
