import sum from "../../_common/sum.js";
import banks from "../_common/banks.js";

const numberOfBatteries = 12;

console.info(
	sum(
		banks
			.map((bank) => {
				let start = 0;
				let end = 1 - numberOfBatteries;

				const digits = [];

				for (let batteryNumber = 1; batteryNumber <= numberOfBatteries; batteryNumber++) {
					const availableBatteries = bank.slice(
						start,
						end === 0 ? undefined : end
					);

					const digit = Math.max(...availableBatteries);

					digits.push(digit);

					const indexOfDigit = availableBatteries.indexOf(digit);

					start = start + indexOfDigit + 1;
					end += 1;
				}

				return Number(digits.join(""));
			})
	)
);
