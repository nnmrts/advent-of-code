import rolls from "../_common/rolls.js";

const numberOfFreeSlotsNeeded = 4;

console.info(
	rolls
		.flatMap((row, rowIndex) => row
			.filter((slotHasRoll, columnIndex) => {
				const adjacentSlots = [
					rolls[rowIndex - 1]?.[columnIndex - 1],
					rolls[rowIndex - 1]?.[columnIndex],
					rolls[rowIndex - 1]?.[columnIndex + 1],
					rolls[rowIndex]?.[columnIndex - 1],
					rolls[rowIndex]?.[columnIndex + 1],
					rolls[rowIndex + 1]?.[columnIndex - 1],
					rolls[rowIndex + 1]?.[columnIndex],
					rolls[rowIndex + 1]?.[columnIndex + 1]
				];

				return (
					slotHasRoll &&
					adjacentSlots.filter(Boolean).length < numberOfFreeSlotsNeeded
				);
			}))
		.length
);
