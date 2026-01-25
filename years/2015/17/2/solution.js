import calculateSum from "../../../_common/calculate-sum.js";
import combineWithoutRepetitions from "../../_common/combine-without-repetitions.js";
import containers from "../_common/containers.js";
import totalVolume from "../_common/total-volume.js";

import { getShortestSumLength } from "./solution/_exports.js";

const validCombinations = combineWithoutRepetitions(
	containers,
	getShortestSumLength(containers, totalVolume)
)
	.filter((combination) => calculateSum(combination) === totalVolume);

console.info(validCombinations.length);
