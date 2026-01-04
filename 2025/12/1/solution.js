import calculateSum from "../../../_common/calculate-sum.js";

import { summary } from "./solution/_exports.js";

const {
	presents,
	trees
} = summary;

const definitelyTooSmallTrees = trees
	.filter(({
		height,
		quantities,
		width
	}) => {
		const treeArea = height * width;

		const exactPresentArea = calculateSum(
			quantities
				.map((quantity, index) => (
					(presents[index].flat().filter(Boolean).length) *
					quantity
				))
		);

		return treeArea < exactPresentArea;
	});

const definitelyLargeEnoughTrees = trees
	.filter(({
		height,
		quantities,
		width
	}) => {
		const maximumPresentLength = Math.max(
			...presents
				.flatMap((present) => [present.length, ...present.map((row) => row.length)])
		);

		const roundedDownTreeArea = (
			(
				maximumPresentLength * Math.floor(height / maximumPresentLength)
			) *
			(
				maximumPresentLength * Math.floor(width / maximumPresentLength)
			)
		);

		return (roundedDownTreeArea / (maximumPresentLength ** 2)) >= calculateSum(quantities);
	});

if (definitelyTooSmallTrees.length + definitelyLargeEnoughTrees.length === trees.length) {
	console.info(definitelyLargeEnoughTrees.length);
}
else {
	throw new Error("not feasible");
}
