import calculateSum from "../../../_common/calculate-sum.js";
import permute from "../../../_common/permute.js";
import relations from "../_common/relations.js";

const allNames = new Set([...relations.values()].flatMap(({ names }) => names));

const permutations = permute([...allNames]);

const collator = new Intl.Collator("en-US", { numeric: true });

const [{ totalHappinessUnits: bestSeatingHappinessUnits }] = permutations
	.map((names) => ({
		names,
		totalHappinessUnits: calculateSum(
			names
				.map((nameA, index) => {
					const nameB = names[(index + 1) % names.length];

					const pair = /** @type {const} */ ([nameA, nameB]);

					const key = pair.toSorted(collator.compare).join(",");

					const { happinessUnits } = relations.get(key);

					return happinessUnits;
				})
		)
	}))
	.toSorted((
		{ totalHappinessUnits: totalHappinessUnitsA },
		{ totalHappinessUnits: totalHappinessUnitsB }
	) => totalHappinessUnitsB - totalHappinessUnitsA);

console.info(bestSeatingHappinessUnits);
