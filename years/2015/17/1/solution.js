import calculateSum from "../../../_common/calculate-sum.js";
import combineWithoutRepetitions from "../../_common/combine-without-repetitions.js";
import containers from "../_common/containers.js";
import totalVolume from "../_common/total-volume.js";

import { getLongestSumLength } from "./solution/_exports.js";

const validCombinations = Array.from(
	{ length: getLongestSumLength(containers, totalVolume) },
	(empty, index) => combineWithoutRepetitions(containers, index + 1)
)
	.flat()
	.filter((combination) => calculateSum(combination) === totalVolume);

console.info(validCombinations.length);
