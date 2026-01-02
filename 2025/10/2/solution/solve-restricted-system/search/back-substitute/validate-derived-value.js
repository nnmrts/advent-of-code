import almostZero from "../../_common/almost-zero.js";

/**
 * Validates and rounds a derived value
 *
 * @param {number} derivedValue
 * @param {number} bound
 */
const validateDerivedValue = (derivedValue, bound) => {
	if (Math.abs(derivedValue - Math.round(derivedValue)) > almostZero) {
		return {
			rounded: 0,
			valid: false
		};
	}

	const rounded = Math.round(derivedValue);

	if (rounded < 0 || rounded > bound) {
		return {
			rounded: 0,
			valid: false
		};
	}

	return {
		rounded,
		valid: true
	};
};

export default validateDerivedValue;
