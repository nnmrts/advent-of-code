const spells = /** @type {const} */ ([
	{
		cost: 53,
		damage: 4,
		name: "Magic Missile"
	},
	{
		cost: 73,
		damage: 2,
		hitPoints: 2,
		name: "Drain"
	},
	{
		cost: 113,
		effect: {
			armor: 7,
			duration: 6
		},
		name: "Shield"
	},
	{
		cost: 173,
		effect: {
			damage: 3,
			duration: 6,
			perTurn: true
		},
		name: "Poison"
	},
	{
		cost: 229,
		effect: {
			duration: 5,
			mana: 101,
			perTurn: true
		},
		name: "Recharge"
	}
]);

export default spells;
