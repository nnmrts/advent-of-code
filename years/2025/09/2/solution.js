import getArea from "../_common/get-area.js";
import tiles from "../_common/tiles.js";

import {
	intersect,
	pointInOrOnPolygon
} from "./solution/_exports.js";

const polygonVertices = tiles;

const polygonEdges = polygonVertices
	.map((tile, index) => /** @type {const} */ (
		[tile, polygonVertices[(index + 1) % polygonVertices.length]]
	));

const verticalPolygonEdges = polygonEdges
	.filter(([[x1], [x2]]) => (x1 === x2));

const horizontalPolygonEdges = polygonEdges
	.filter(([[, y1], [, y2]]) => (y1 === y2));

let maximumArea = 0;

for (const [index, [xA, yA]] of polygonVertices.entries()) {
	for (const [xB, yB] of polygonVertices.slice(index + 1)) {
		const corners = /** @type {const} */ ([
			[xA, yA],
			[xA, yB],
			[xB, yB],
			[xB, yA]
		]);

		const cornersInsideOrOn = corners
			.every((corner) => pointInOrOnPolygon(corner, polygonEdges));

		if (!cornersInsideOrOn) {
			continue;
		}

		const [
			edgeV1,
			edgeH1,
			edgeV2,
			edgeH2
		] = corners.map((cornerA, cornerIndex) => /** @type {const} */ (
			[cornerA, corners[(cornerIndex + 1) % corners.length]]
		));

		const crossesBoundary =	(
			horizontalPolygonEdges.some((polygonEdge) => (
				intersect(edgeV1, polygonEdge) ||
				intersect(edgeV2, polygonEdge)
			)) ||
			verticalPolygonEdges.some((polygonEdge) => (
				intersect(edgeH1, polygonEdge) ||
				intersect(edgeH2, polygonEdge)
			))
		);

		if (crossesBoundary) {
			continue;
		}

		const area = getArea([xA, yA], [xB, yB]);

		if (area > maximumArea) {
			maximumArea = area;
		}
	}
}

console.info(maximumArea);
