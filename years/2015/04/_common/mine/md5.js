/* eslint-disable no-bitwise -- MD5 requires bitwise operations for hashing */
/* eslint-disable no-magic-numbers -- MD5 round constants, shifts, and initial state are RFC 1321 spec values */
/* eslint-disable id-length -- single-letter variables (a, b, c, d) per RFC 1321 */

const blockSize = 64;
const maxPaddedSize = 128;

const words = new Uint32Array(16);
const state = new Uint32Array(4);
const padded = new Uint8Array(maxPaddedSize);
const paddedDataView = new DataView(padded.buffer);

const initState = new Uint32Array([
	0x67_45_23_01,
	0xEF_CD_AB_89,
	0x98_BA_DC_FE,
	0x10_32_54_76
]);

const kConstants = new Uint32Array([
	0xD7_6A_A4_78,
	0xE8_C7_B7_56,
	0x24_20_70_DB,
	0xC1_BD_CE_EE,
	0xF5_7C_0F_AF,
	0x47_87_C6_2A,
	0xA8_30_46_13,
	0xFD_46_95_01,
	0x69_80_98_D8,
	0x8B_44_F7_AF,
	0xFF_FF_5B_B1,
	0x89_5C_D7_BE,
	0x6B_90_11_22,
	0xFD_98_71_93,
	0xA6_79_43_8E,
	0x49_B4_08_21,
	0xF6_1E_25_62,
	0xC0_40_B3_40,
	0x26_5E_5A_51,
	0xE9_B6_C7_AA,
	0xD6_2F_10_5D,
	0x02_44_14_53,
	0xD8_A1_E6_81,
	0xE7_D3_FB_C8,
	0x21_E1_CD_E6,
	0xC3_37_07_D6,
	0xF4_D5_0D_87,
	0x45_5A_14_ED,
	0xA9_E3_E9_05,
	0xFC_EF_A3_F8,
	0x67_6F_02_D9,
	0x8D_2A_4C_8A,
	0xFF_FA_39_42,
	0x87_71_F6_81,
	0x6D_9D_61_22,
	0xFD_E5_38_0C,
	0xA4_BE_EA_44,
	0x4B_DE_CF_A9,
	0xF6_BB_4B_60,
	0xBE_BF_BC_70,
	0x28_9B_7E_C6,
	0xEA_A1_27_FA,
	0xD4_EF_30_85,
	0x04_88_1D_05,
	0xD9_D4_D0_39,
	0xE6_DB_99_E5,
	0x1F_A2_7C_F8,
	0xC4_AC_56_65,
	0xF4_29_22_44,
	0x43_2A_FF_97,
	0xAB_94_23_A7,
	0xFC_93_A0_39,
	0x65_5B_59_C3,
	0x8F_0C_CC_92,
	0xFF_EF_F4_7D,
	0x85_84_5D_D1,
	0x6F_A8_7E_4F,
	0xFE_2C_E6_E0,
	0xA3_01_43_14,
	0x4E_08_11_A1,
	0xF7_53_7E_82,
	0xBD_3A_F2_35,
	0x2A_D7_D2_BB,
	0xEB_86_D3_91
]);

const wordIndices = Uint8Array.from({ length: 64 }, (empty, step) => {
	const round = step >>> 4;

	switch (round) {
		case 0:
			return step;
		case 1:
			return ((5 * step) + 1) & 15;
		case 2:
			return ((3 * step) + 5) & 15;
		default:
			return (7 * step) & 15;
	}
});

const roundShifts = new Uint8Array([
	7,
	12,
	17,
	22,
	5,
	9,
	14,
	20,
	4,
	11,
	16,
	23,
	6,
	10,
	15,
	21
]);

const allShifts = Uint8Array.from(
	{ length: 64 },
	(empty, step) => roundShifts[((step >>> 4) << 2) + (step & 3)]
);

/**
 * @param {number} value
 * @param {number} bits
 */
const rotateLeft32 = (value, bits) => (value << bits) | (value >>> (32 - bits));

/**
 * @param {DataView} dataView
 * @param {number} offset
 */
const loadWords = (dataView, offset) => {
	for (let index = 0; index < 16; index++) {
		words[index] = dataView.getUint32(offset + (index * 4), true);
	}
};

/**
 * @param {Uint32Array} stateArray
 */
const processBlock = (stateArray) => {
	let [
		a,
		b,
		c,
		d
	] = stateArray;
	const [
		a0,
		b0,
		c0,
		d0
	] = stateArray;

	for (let step = 0; step < 64; step++) {
		const round = step >>> 4;
		let mixer;

		switch (round) {
			case 0:
				mixer = ((c ^ d) & b) ^ d;
				break;
			case 1:
				mixer = ((b ^ c) & d) ^ c;
				break;
			case 2:
				mixer = b ^ c ^ d;
				break;
			default:
				mixer = c ^ (b | ~d);
		}

		const previousD = d;

		d = c;
		c = b;
		b += rotateLeft32(a + mixer + words[wordIndices[step]] + kConstants[step], allShifts[step]);
		a = previousD;
	}

	stateArray[0] = (a + a0) >>> 0;
	stateArray[1] = (b + b0) >>> 0;
	stateArray[2] = (c + c0) >>> 0;
	stateArray[3] = (d + d0) >>> 0;
};

/**
 * @param {Uint8Array} message
 */
const md5 = (message) => {
	const messageLength = message.length;
	const bitLength = messageLength * 8;
	const paddedLength = Math.ceil((messageLength + 9) / 64) * 64;

	padded.fill(0, messageLength, paddedLength);
	padded.set(message);
	padded[messageLength] = 0x80;
	paddedDataView.setUint32(paddedLength - 8, bitLength, true);

	state.set(initState);

	for (let offset = 0; offset < paddedLength; offset += blockSize) {
		loadWords(paddedDataView, offset);
		processBlock(state);
	}

	return state.buffer;
};

export default md5;
