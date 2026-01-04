import calculateSum from "../../../_common/calculate-sum.js";
import locationColumns from "../_common/location-columns.js";

const sortedLocationColumns = locationColumns
	.map((locations) => (
		locations
			.toSorted((locationA, locationB) => locationA - locationB)
	));

const distances = sortedLocationColumns[0]
	.map((locationA, index) => Math.abs(locationA - sortedLocationColumns[1][index]));

const solution = calculateSum(distances);

console.info(solution);
