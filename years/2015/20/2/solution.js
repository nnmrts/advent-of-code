/* eslint-disable no-loop-func -- just used in filter */
import calculateSum from "../../../_common/calculate-sum.js";
import getDivisors from "../_common/get-divisors.js";
import minimumNumberOfPresents from "../_common/minimum-number-of-presents.js";

import {
	getHarmonicNumber,
	maximumHousesPerElf,
	presentsPerElf
} from "./solution/_exports.js";

/**
 * Each elf delivers presents to at most `maximumHousesPerElf` houses.
 * This means a house `n` only receives contributions from divisors `d` such that
 * `n / d <= maximumHousesPerElf`. The total number of presents is therefore
 * bounded above by:
 *
 * presents(n) <= presentsPerElf * n * H_{maximumHousesPerElf}
 *
 * where H_k is the k-th harmonic number.
 *
 * By inverting this upper bound, we obtain a guaranteed lower starting point:
 *
 * n >= minimumNumberOfPresents / (presentsPerElf * H_{maximumHousesPerElf})
 *
 * This estimate intentionally undershoots the true solution and is refined by
 * the linear scan that follows, ensuring correctness while avoiding a naive
 * start at house 1.
 */
let houseNumber = Math.floor(
	minimumNumberOfPresents /
	(presentsPerElf * getHarmonicNumber(maximumHousesPerElf))
);

let numberOfPresents = 0;

while (true) {
	const divisors = [...getDivisors(houseNumber)]
		.filter((divisor) => divisor >= houseNumber / maximumHousesPerElf);

	numberOfPresents = calculateSum([...divisors]) * presentsPerElf;

	if (numberOfPresents >= minimumNumberOfPresents) {
		break;
	}

	houseNumber += 1;
}

console.info(houseNumber);
