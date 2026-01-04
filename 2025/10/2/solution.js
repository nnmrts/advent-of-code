import calculateSum from "../../../_common/calculate-sum.js";
import machines from "../_common/machines.js";

import {
	buildMatrixAndBounds,
	solveRestrictedSystem
} from "./solution/_exports.js";

const result = calculateSum(
	machines.map(({ buttonWiringSchematics, joltageRequirements }) => {
		const {
			matrix,
			numberOfButtons,
			numberOfCounters,
			strictBounds
		} = buildMatrixAndBounds(buttonWiringSchematics, joltageRequirements);

		return solveRestrictedSystem({
			bounds: strictBounds,
			matrix,
			numberOfColumns: numberOfButtons,
			numberOfRows: numberOfCounters,
			target: [...joltageRequirements]
		});
	})
);

console.info(result);
