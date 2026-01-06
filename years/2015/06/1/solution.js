import instructions from "../_common/instructions.js";

const grid = Array.from({ length: 1_000 }, () => Array.from({ length: 1_000 }, () => false));

for (const { action, corners: [[xA, yA], [xB, yB]] } of instructions) {
	for (let row = xA; row <= xB; row++) {
		for (let column = yA; column <= yB; column++) {
			grid[row][column] = action === "toggle"
				? !grid[row][column]
				: action === "on";
		}
	}
}

console.info(grid.flat().filter(Boolean).length);
