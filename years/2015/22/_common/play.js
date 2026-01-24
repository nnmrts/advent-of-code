/**
 * @import Party from "../../_common/party.js";
 */

import { spells } from "./play/_exports.js";

let minimumManaSpent = Infinity;

/**
 *
 * @param {InstanceType<typeof Party>} currentPlayer
 * @param {InstanceType<typeof Party>} currentBoss
 * @param {number} [turn]
 * @param {number} [manaSpent]
 * @returns {number[]}
 */
const play = (
	currentPlayer,
	currentBoss,
	turn = 1,
	manaSpent = 0
) => {
	const isPlayerTurn = turn % 2 === 1;

	currentBoss.startTurn(currentPlayer, isPlayerTurn ? currentPlayer : currentBoss);

	if (currentPlayer.hitPoints <= 0) {
		return [];
	}

	currentPlayer.startTurn(currentBoss, isPlayerTurn ? currentPlayer : currentBoss);

	if (currentBoss.hitPoints <= 0) {
		if (manaSpent < minimumManaSpent) {
			minimumManaSpent = manaSpent;
		}

		return [manaSpent];
	}

	if (manaSpent >= minimumManaSpent) {
		return [];
	}

	if (turn % 2 === 1) {
		return spells
			.filter(({ cost, name }) => (
				currentPlayer.mana >= cost &&
				!currentPlayer.activeEffects.has(name) &&
				manaSpent + cost < minimumManaSpent
			))
			.flatMap((spell) => {
				const nextPlayer = currentPlayer.clone();
				const nextBoss = currentBoss.clone();

				nextPlayer.cast(spell, nextBoss);

				return play(
					nextPlayer,
					nextBoss,
					turn + 1,
					manaSpent + spell.cost
				);
			});
	}

	const nextPlayer = currentPlayer.clone();
	const nextBoss = currentBoss.clone();

	nextBoss.attack(nextPlayer);

	return play(
		nextPlayer,
		nextBoss,
		turn + 1,
		manaSpent
	);
};

export default play;
