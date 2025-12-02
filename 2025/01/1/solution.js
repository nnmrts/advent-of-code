import divisor from "../_common/divisor.js";
import rotations from "../_common/rotations.js";

let currentPosition = 50;

const positionsAfterRotations = rotations
	.map(({ amount, sign }) => {
		currentPosition = (((currentPosition + (amount * sign)) % divisor) + divisor) % divisor;

		return currentPosition;
	});

const numberOfZeroes = positionsAfterRotations.filter((position) => position === 0).length;

console.info(numberOfZeroes);
