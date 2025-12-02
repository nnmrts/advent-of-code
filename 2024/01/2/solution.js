import calculateSum from "../_common/calculate-sum.js";
import locationColumns from "../_common/location-columns.js";

const solution = calculateSum(
	locationColumns[0]
		.map((location) => location * locationColumns[1].filter((otherLocation) => otherLocation === location).length)
);

console.info(solution);
