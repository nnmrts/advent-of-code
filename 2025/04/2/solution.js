/* eslint-disable no-loop-func -- immediately discarded map callback */

import rolls from "../_common/rolls.js";

const numberOfFreeSlotsNeeded = 4;

let finished = false;

let currentRolls = [...rolls];

let total = 0;

while (!finished) {
	let atLeastOneRollRemoved = false;

	currentRolls = currentRolls
		.map((row, rowIndex) => row
			.map((slotHasRoll, columnIndex) => {
				const adjacentSlots = [
					currentRolls[rowIndex - 1]?.[columnIndex - 1],
					currentRolls[rowIndex - 1]?.[columnIndex],
					currentRolls[rowIndex - 1]?.[columnIndex + 1],
					currentRolls[rowIndex]?.[columnIndex - 1],
					currentRolls[rowIndex]?.[columnIndex + 1],
					currentRolls[rowIndex + 1]?.[columnIndex - 1],
					currentRolls[rowIndex + 1]?.[columnIndex],
					currentRolls[rowIndex + 1]?.[columnIndex + 1]
				];

				const removingRoll = (
					slotHasRoll &&
					adjacentSlots.filter(Boolean).length < numberOfFreeSlotsNeeded
				);

				if (removingRoll) {
					total += 1;
					atLeastOneRollRemoved = true;
				}

				return slotHasRoll && !removingRoll;
			}));

	if (!atLeastOneRollRemoved) {
		finished = true;
	}
}

console.info(total);
