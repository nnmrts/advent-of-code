import calculateSum from "../../../_common/calculate-sum.js";
import divisor from "../_common/divisor.js";
import maximum from "../_common/maximum.js";
import rotations from "../_common/rotations.js";

let currentPosition = 50;

// TODO[2025-12-12]: This is horrible code, fix it
const zeroesDuringRotations = calculateSum(
	rotations
		.map(({ amount, sign }) => {
			let zeroCount = 0;

			for (let index = 0; index < amount; index++) {
				currentPosition += sign;

				if (currentPosition === -1) {
					currentPosition = maximum;
				}
				if (currentPosition === divisor) {
					currentPosition = 0;
				}
				if (currentPosition === 0) {
					zeroCount += 1;
				}
			}

			return zeroCount;
		})
);

console.info(zeroesDuringRotations);
