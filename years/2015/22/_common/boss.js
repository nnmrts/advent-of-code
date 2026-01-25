import getInput from "../../../_common/get-input.js";
import mapValues from "../../_common/map-values.js";
import Party from "../../_common/party.js";

/**
 * @import RegExpWithGroups from "../../../../types/reg-exp-with-groups.d.ts";
 */

const input = await getInput();

const trimmedInput = input.trim();

/**
 * @typedef {RegExpWithGroups<"hitPoints"|"damage">} Regex
 */

const regex = /** @type {Regex} */ (
	/^Hit Points: (?<hitPoints>\d+)\nDamage: (?<damage>\d+)$/v
);

const match = trimmedInput.match(regex);

if (match === null) {
	throw new Error(`no match for ${regex} found`);
}

const boss = new Party({
	...mapValues(match.groups, Number),
	name: "Boss"
});

export default boss;
