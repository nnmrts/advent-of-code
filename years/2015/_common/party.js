/**
 * @template {object} T
 * @typedef {{[K in keyof T as undefined extends T[K] ? T[K] extends undefined ? never : K : K]: Exclude<T[K], undefined>}} Shaken
 */

import pick from "../15/_common/pick.js";

/**
 * @typedef {(object: object, filter?: (value: unknown) => boolean) => object} ShakeFunction
 */

/**
 * @type {{
 *   <T extends object>(object: T): Shaken<T>;
 *   <T extends object>(object: T, filter: (value: unknown) => boolean): T;
 * }}
 */
const shake = /** @type {ShakeFunction} */ ((
	object,
	filter = /** @type {(value: unknown) => boolean} */ ((value) => value === undefined)
) => /** @type {string[]} */ (Object.keys(object)).reduce(
	(accumulator, key) => {
		if (!filter(object[/** @type {keyof typeof object} */ (key)])) {
			accumulator[key] = object[/** @type {keyof typeof object} */ (key)];
		}

		return accumulator;
	},
	/** @type {Record<string, unknown>} */ ({})
));

/**
 * @typedef {object} Effect
 * @property {number} duration
 * @property {boolean} [applied]
 * @property {number} [armor]
 * @property {number} [damage]
 * @property {number} [hitPoints]
 * @property {number} [mana]
 * @property {boolean} [perTurn]
 * @property {readonly string[]} [perTurnOf]
 */

/**
 * @typedef {object} SpellWithDamage
 * @property {string} name
 * @property {number} cost
 * @property {number} damage
 * @property {number} [hitPoints]
 * @property {Effect} [effect]
 */

/**
 * @typedef {object} SpellWithoutDamage
 * @property {string} name
 * @property {number} cost
 * @property {never} [damage]
 * @property {number} [hitPoints]
 * @property {Effect} [effect]
 */

/**
 * @typedef {SpellWithDamage|SpellWithoutDamage} Spell
 */

/**
 * @typedef {object} PartyLike
 * @property {string} [name]
 * @property {number} [armor]
 * @property {number} [damage]
 * @property {number} [hitPoints]
 * @property {number} [mana]
 * @property {Map<string, Effect>} [activeEffects]
 * @property {Map<string, Effect>} [queuedEffects]
 */

const Party = class {

	/**
	 * @type {Map<string, Effect>}
	 */
	activeEffects = new Map();

	armor = 0;

	damage = 0;

	hitPoints = 0;

	mana = 0;

	name = "Party";

	/**
	 * @type {Map<string, Effect>}
	 */
	queuedEffects = new Map();

	/**
	 * @param {PartyLike} stats
	 */
	constructor(stats) {
		Object.assign(this, stats);
	}

	/**
	 * @param {InstanceType<typeof Party>} otherParty
	 */
	attack = (otherParty) => {
		if (this.hitPoints > 0) {
			otherParty.defend(this);
		}
	};

	/**
	 * @param {Spell} spell
	 * @param {InstanceType<typeof Party>} [otherParty]
	 */
	cast = (
		{
			cost,
			damage,
			effect,
			hitPoints,
			name
		},
		otherParty
	) => {
		if (this.hitPoints > 0) {
			if (this.mana < cost) {
				this.hitPoints = 0;
			}
			else {
				this.mana -= cost;

				if (damage !== undefined) {
					const oldDamage = this.damage;

					this.damage = damage;

					this.attack(/** @type {InstanceType<typeof Party>} */ (otherParty));

					this.damage = oldDamage;
				}

				if (hitPoints !== undefined) {
					this.hitPoints += hitPoints;
				}

				if (effect !== undefined) {
					this.queuedEffects.set(name, effect);
				}
			}
		}
	};

	clone = () => new Party(
		structuredClone({
			activeEffects: this.activeEffects,
			armor: this.armor,
			damage: this.damage,
			hitPoints: this.hitPoints,
			mana: this.mana,
			name: this.name,
			queuedEffects: this.queuedEffects
		})
	);

	/**
	 * @param {InstanceType<typeof Party>} otherParty
	 */
	defend = ({ damage }) => {
		this.hitPoints -= Math.max(1, damage - this.armor);
	};

	/**
	 *
	 * @param {{armor: number, damage: number}} loadout
	 */
	equip = (loadout) => {
		Object.assign(this, pick(loadout, ["armor", "damage"]));
	};

	/**
	 * @param {InstanceType<typeof Party>} otherParty
	 * @param {InstanceType<typeof Party>} ofParty
	 */
	startTurn = (otherParty, ofParty) => {
		if (this.hitPoints <= 0) {
			return;
		}

		this.#activateEffects();

		for (const [name, effect] of this.activeEffects) {
			this.#processEffect({
				effect,
				name,
				ofParty,
				otherParty
			});
		}
	};

	#activateEffects = () => {
		for (const entry of this.queuedEffects) {
			this.activeEffects.set(...entry);
		}

		this.queuedEffects = new Map();
	};

	/**
	 * @param {InstanceType<typeof Party>} otherParty
	 * @param {Effect} effect
	 */
	#applyEffectBonuses = (
		otherParty,
		{
			armor,
			damage,
			mana
		}
	) => {
		if (damage) {
			const oldDamage = this.damage;

			this.damage = damage;
			this.attack(otherParty);
			this.damage = oldDamage;
		}

		if (armor) {
			this.armor += armor;
		}

		if (mana) {
			this.mana += mana;
		}
	};

	/**
	 * @param {object} options
	 * @param {string} options.name
	 * @param {Effect} options.effect
	 * @param {InstanceType<typeof Party>} options.otherParty
	 * @param {InstanceType<typeof Party>} options.ofParty
	 */
	#processEffect = ({
		effect,
		name,
		ofParty,
		otherParty
	}) => {
		const {
			applied,
			perTurn,
			perTurnOf
		} = effect;

		const shouldApply = (
			(
				perTurn &&
				(perTurnOf === undefined || perTurnOf.includes(ofParty.name))
			) ||
			!applied
		);

		if (shouldApply) {
			this.#applyEffectBonuses(otherParty, effect);
		}

		this.#updateEffectDuration(name, effect);
	};

	/**
	 * @param {string} name
	 * @param {Effect} effect
	 */
	#updateEffectDuration = (
		name,
		{
			armor,
			duration,
			perTurn,
			...rest
		}
	) => {
		const nextDuration = duration - 1;

		if (nextDuration > 0) {
			this.activeEffects.set(
				name,
				shake({
					...rest,
					applied: true,
					armor,
					duration: nextDuration,
					perTurn
				})
			);

			return;
		}

		if (armor && !perTurn) {
			this.armor -= armor;
		}

		this.activeEffects.delete(name);
	};

};

export default Party;
