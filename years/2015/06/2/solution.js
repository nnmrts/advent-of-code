import calculateSum from "../../../_common/calculate-sum.js";
import instructions from "../_common/instructions.js";

const grid = Array.from({ length: 1_000 }, () => Array.from({ length: 1_000 }, () => 0));

for (const { action, corners: [[xA, yA], [xB, yB]] } of instructions) {
	for (let row = xA; row <= xB; row++) {
		for (let column = yA; column <= yB; column++) {
			switch (action) {
				case "off":
					grid[row][column] = Math.max(0, grid[row][column] - 1);
					break;
				case "on":
					grid[row][column] += 1;
					break;
				case "toggle":
					grid[row][column] += 2;
					break;
				default:
					break;
			}
		}
	}
}

console.info(calculateSum(grid.flat()));
