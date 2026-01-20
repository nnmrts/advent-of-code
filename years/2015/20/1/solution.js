import calculateSum from "../../../_common/calculate-sum.js";
import getDivisors from "../_common/get-divisors.js";
import minimumNumberOfPresents from "../_common/minimum-number-of-presents.js";

import {
	presentsPerElf,
	pseudoEulerGamma
} from "./solution/_exports.js";

/**
 * Initial estimate for the lowest house number that could plausibly reach
 * the required number of presents.
 *
 * This is derived from the asymptotic upper bound
 *
 * σ(n) ≈ e^γ * n * log log n
 *
 * inverted to solve approximately for n, assuming
 *
 * presentsPerElf * σ(n) ≥ minimumNumberOfPresents.
 *
 * We intentionally use 1 / sqrt(3) as a stand-in for the Euler–Mascheroni
 * constant γ (`pseudoEulerGamma`), which slightly undershoots the estimate on
 * purpose. Any remaining gap is resolved by the subsequent linear scan.
 *
 * The result is a mathematically motivated starting point that avoids
 * beginning at house 1 while guaranteeing correctness.
 */
let houseNumber = Math.max(
	1,
	Math.floor(
		Math.exp(-pseudoEulerGamma) *
		(
			(minimumNumberOfPresents / presentsPerElf) /
			Math.log(Math.log(minimumNumberOfPresents / presentsPerElf))
		)
	)
);

let numberOfPresents = 0;

while (true) {
	numberOfPresents = calculateSum([...getDivisors(houseNumber)]) * presentsPerElf;

	if (numberOfPresents >= minimumNumberOfPresents) {
		break;
	}

	houseNumber += 1;
}

console.info(houseNumber);
