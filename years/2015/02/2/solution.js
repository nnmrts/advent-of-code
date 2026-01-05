import calculateSum from "../../../_common/calculate-sum.js";
import presents from "../_common/presents.js";

const ribbon = calculateSum(
	presents
		.map(({
			height,
			length,
			width
		}) => {
			const faces = [[length, width], [width, height], [height, length]];

			const perimeters = faces.map((values) => calculateSum(values) * 2);

			return (
				Math.min(...perimeters) +
				(length * width * height)
			);
		})
);

console.info(ribbon);
