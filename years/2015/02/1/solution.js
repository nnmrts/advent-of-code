import calculateProduct from "../../../_common/calculate-product.js";
import calculateSum from "../../../_common/calculate-sum.js";
import presents from "../_common/presents.js";

const wrappingPaper = calculateSum(
	presents
		.map(({
			height,
			length,
			width
		}) => {
			const faces = [[length, width], [width, height], [height, length]];

			const areas = faces.map(calculateProduct);

			return (
				(
					calculateSum(
						areas
					) * 2
				) +
				Math.min(...areas)
			);
		})
);

console.info(wrappingPaper);
