import mapValues from "../../_common/map-values.js";

import { omit } from "./loadouts/_exports.js";

const shopWeapons = [
	{
		armor: 0,
		cost: 8,
		damage: 4,
		name: "Dagger"
	},
	{
		armor: 0,
		cost: 10,
		damage: 5,
		name: "Shortsword"
	},
	{
		armor: 0,
		cost: 25,
		damage: 6,
		name: "Warhammer"
	},
	{
		armor: 0,
		cost: 40,
		damage: 7,
		name: "Longsword"
	},
	{
		armor: 0,
		cost: 74,
		damage: 8,
		name: "Greataxe"
	}
];

const shopArmors = [
	{
		armor: 1,
		cost: 13,
		damage: 0,
		name: "Leather"
	},
	{
		armor: 2,
		cost: 31,
		damage: 0,
		name: "Chainmail"
	},
	{
		armor: 3,
		cost: 53,
		damage: 0,
		name: "Splintmail"
	},
	{
		armor: 4,
		cost: 75,
		damage: 0,
		name: "Bandedmail"
	},
	{
		armor: 5,
		cost: 102,
		damage: 0,
		name: "Platemail"
	}
];

const shopRings = [
	{
		armor: 0,
		cost: 25,
		damage: 1,
		name: "Damage +1"
	},
	{
		armor: 0,
		cost: 50,
		damage: 2,
		name: "Damage +2"
	},
	{
		armor: 0,
		cost: 100,
		damage: 3,
		name: "Damage +3"
	},
	{
		armor: 1,
		cost: 20,
		damage: 0,
		name: "Defense +1"
	},
	{
		armor: 2,
		cost: 40,
		damage: 0,
		name: "Defense +2"
	},
	{
		armor: 3,
		cost: 80,
		damage: 0,
		name: "Defense +3"
	}
];

const loadouts = shopWeapons
	.flatMap((weapon) => /** @type {const} */ ([...shopArmors, null])
		.flatMap((armorOrNull) => /** @type {const} */ ([
			[],
			...shopRings.flatMap((ring, ringIndex) => /** @type {const} */ ([
				[ring],
				...shopRings
					.slice(ringIndex + 1)
					.map((otherRing) => /** @type {const} */ ([ring, otherRing]))
			]))
		])
			.map((rings) => /** @type {const} */ ({
				...[armorOrNull, ...rings, weapon]
					.filter((item) => item !== null)
					.reduce(
						(previousItem, currentItem) => mapValues(
							omit(currentItem, ["name"]),
							(value, key) => value + previousItem[key]
						),
						mapValues(omit(weapon, ["name"]), () => 0)
					),
				items: {
					armor: armorOrNull,
					rings,
					weapon
				}
			}))));

export default loadouts;
