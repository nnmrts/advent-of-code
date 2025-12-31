import getArea from "../_common/get-area.js";
import tiles from "../_common/tiles.js";

const areas = tiles
	.flatMap((tileA, tileAIndex) => tiles
		.slice(tileAIndex + 1)
		.map((tileB) => /** @type {const} */ ([
			tileA,
			tileB,
			getArea(
				tileA,
				tileB
			)
		])))
	.toSorted(([tileAA, tileBA, areaA], [tileAB, tileBB, areaB]) => areaB - areaA);

console.info(
	areas[0]
);
