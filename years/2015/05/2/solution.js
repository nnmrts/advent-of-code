/* eslint-disable regexp/no-super-linear-backtracking -- santa isn't a hacker */

import list from "../_common/list.js";

const matches = list.matchAll(/^.*?(?=.*?(?<first>[a-z])[a-z]\k<first>)(?=.*?(?<pair>[a-z]{2}).*?\k<pair>).+$/gmv);

console.info([...matches].length);
