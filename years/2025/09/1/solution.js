import getArea from "../_common/get-area.js";
import tiles from "../_common/tiles.js";

const areas = tiles
	.flatMap((tileA, tileAIndex) => tiles
		.slice(tileAIndex + 1)
		.map((tileB) => getArea(
			tileA,
			tileB
		)))
	.toSorted((areaA, areaB) => areaB - areaA);

console.info(
	areas[0]
);
