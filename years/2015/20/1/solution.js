import calculateSum from "../../../_common/calculate-sum.js";
import getDivisors from "../_common/get-divisors.js";
import minimumNumberOfPresents from "../_common/minimum-number-of-presents.js";

let houseNumber = 1;

let numberOfPresents = 0;

while (numberOfPresents < minimumNumberOfPresents) {
	numberOfPresents = calculateSum([...getDivisors(houseNumber)]) * 10;

	houseNumber += 1;
}

console.info(houseNumber - 1);
