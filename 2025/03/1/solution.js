import sum from "../../_common/sum.js";
import banks from "../_common/banks.js";

console.info(
	sum(
		banks
			.map((bank) => {
				const bankWithoutLastBattery = bank.slice(0, -1);

				const digit1 = Math.max(...bankWithoutLastBattery);

				const indexOfDigit1 = bank.indexOf(digit1);

				const bankFromDigit1Exclusive = bank.slice(indexOfDigit1 + 1);

				const digit2 = Math.max(...bankFromDigit1Exclusive);

				return Number(`${digit1}${digit2}`);
			})
	)
);
