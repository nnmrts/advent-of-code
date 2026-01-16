/**
 * @import { KeyFilter } from "../_types/key-filter.doc.js";
 */

/**
 * @template {object} ObjectTemplate
 * @template {KeyFilter<ObjectTemplate> | null | undefined} FilterTemplate
 * @typedef {Extract<keyof ObjectTemplate, FilterTemplate extends readonly any[] ? FilterTemplate[number] : any>} FilteredKeys
 */
