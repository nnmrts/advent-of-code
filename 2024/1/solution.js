import getInput from "../../_common/get-input.js";

import { calculateSum, transpose } from "./solution/_exports.js";

const input = await getInput();

const lines = input.split("\n")
	.filter((line) => line.match(/\d+\s+\d+/v) !== null);

const sortedLocationIds = transpose(
	lines.map((line) => line.split(/\s+/v).map(Number))
)
	.map((locationIds) => (
		locationIds
			.toSorted((locationIdA, locationIdB) => locationIdA - locationIdB)
	));

const distances = sortedLocationIds[0]
	.map((locationIdA, index) => Math.abs(locationIdA - sortedLocationIds[1][index]));

const solution = calculateSum(distances);

console.log(solution);
