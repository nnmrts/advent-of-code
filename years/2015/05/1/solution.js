/* eslint-disable regexp/no-super-linear-backtracking, security/detect-unsafe-regex -- santa isn't a hacker */
import list from "../_common/list.js";

const matches = list.matchAll(/^(?=(?:.*?[aeiou].*?){3})(?=.*?(?<first>[a-z])\k<first>)(?:(?!ab|cd|pq|xy).)+$/gmv);

console.info([...matches].length);
