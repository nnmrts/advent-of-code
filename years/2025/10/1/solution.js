import calculateSum from "../../../_common/calculate-sum.js";
import machines from "../_common/machines.js";

import {
	areArraysEqual,
	combineWithRepetitions
} from "./solution/_exports.js";

/**
 *
 * @param {object} options
 * @param {readonly (readonly number[])[]} options.buttonWiringSchematics
 * @param {readonly (readonly number[])[]} options.combination
 * @param {readonly boolean[]} options.indicatorLights
 */
const pressButtons = ({
	buttonWiringSchematics,
	combination,
	indicatorLights
}) => {
	if (combination.length === 0) {
		return indicatorLights;
	}

	const [button] = combination;

	return pressButtons({
		buttonWiringSchematics,
		combination: combination.slice(1),
		indicatorLights: indicatorLights.map((on, index) => (button.includes(index) ? !on : on))
	});
};

const result = calculateSum(
	machines
		.map(({
			buttonWiringSchematics,
			indicatorLightDiagram
		}) => {
			const indicatorLights = Array.from(
				{ length: indicatorLightDiagram.length },
				() => false
			);

			for (
				let numberOfButtonPresses = 1;
				numberOfButtonPresses < 10;
				numberOfButtonPresses++
			) {
				const combinations = combineWithRepetitions(
					buttonWiringSchematics,
					numberOfButtonPresses
				);

				for (const combination of combinations) {
					const indicatorLightsAfter = pressButtons({
						buttonWiringSchematics,
						combination,
						indicatorLights
					});

					if (areArraysEqual(indicatorLightDiagram, indicatorLightsAfter)) {
						return numberOfButtonPresses;
					}
				}
			}

			throw new Error("no solution found");
		})
);

console.info(result);
