/* eslint-disable consistent-return -- switch has no default case, returns are in case blocks only */
/* eslint-disable array-callback-return -- implicit return handled by switch cases */
/* eslint-disable no-loop-func -- intentionally accessing currentGrid which updates each iteration */

import calculateSum from "../../../_common/calculate-sum.js";
import grid from "../_common/grid.js";
import maximumOnNeighborsToStayOn from "../_common/maximum-on-neighbors-to-stay-on.js";
import minimumOnNeighborsToStayOn from "../_common/minimum-on-neighbors-to-stay-on.js";
import onNeighborsToTurnOn from "../_common/on-neighbors-to-turn-on.js";
import steps from "../_common/steps.js";

import { turnOnGridCorners } from "./solution/_exports.js";

let currentGrid = structuredClone(grid);

for (let currentStep = 1; currentStep <= steps; currentStep++) {
	currentGrid = turnOnGridCorners(currentGrid);

	currentGrid = currentGrid
		.map((row, y) => row.map((value, x) => {
			const neighborCoordinates = [
				[x - 1, y - 1],
				[x, y - 1],
				[x + 1, y - 1],
				[x - 1, y],
				[x + 1, y],
				[x - 1, y + 1],
				[x, y + 1],
				[x + 1, y + 1]
			];

			const neighbors = neighborCoordinates
				.map(([innerX, innerY]) => currentGrid[innerY]?.[innerX] ?? 0);

			const neighborSum = calculateSum(neighbors);

			switch (value) {
				case 0:
					return Number(neighborSum === onNeighborsToTurnOn);
				case 1:
					return Number(
						neighborSum >= minimumOnNeighborsToStayOn &&
						neighborSum <= maximumOnNeighborsToStayOn
					);
				// no default
			}
		}));
}

currentGrid = turnOnGridCorners(currentGrid);

console.info(currentGrid.flat().filter(Boolean).length);
