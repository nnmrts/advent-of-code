import {
	pointInPolygon,
	pointOnSegment
} from "./point-in-or-on-polygon/_exports.js";

/**
 *
 * @param {readonly [number, number]} point
 * @param {readonly (readonly [readonly [number, number], readonly [number, number]])[]} edges
 */
const pointInOrOnPolygon = (point, edges) => (
	edges.some((edge) => pointOnSegment(point, edge)) ||
	pointInPolygon(point, edges)
);

export default pointInOrOnPolygon;
