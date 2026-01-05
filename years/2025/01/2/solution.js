import calculateSum from "../../../_common/calculate-sum.js";
import divisor from "../_common/divisor.js";
import rotations from "../_common/rotations.js";

let currentPosition = 50;

const zeroesDuringRotations = calculateSum(
	rotations.map(({ amount, sign }) => {
		const zeroCount = sign === 1
			? Math.floor((currentPosition + amount) / divisor)
			: Math.floor((amount + divisor - (currentPosition || divisor)) / divisor);

		currentPosition = (((currentPosition + (amount * sign)) % divisor) + divisor) % divisor;

		return zeroCount;
	})
);

console.info(zeroesDuringRotations);
