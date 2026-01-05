/* eslint-disable regexp/no-super-linear-backtracking, security/detect-unsafe-regex -- santa isn't a hacker */
import list from "../_common/list.js";

const matches = list.matchAll(/^(?:a(?!b)|(?<!a)b|c(?!d)|(?<!c)d|[e-or-wz]|p(?!q)|(?<!p)q|x(?!y)|(?<!x)y)*?(?=(?:(?:a(?!b)|(?<!a)b|c(?!d)|(?<!c)d|[e-or-wz]|p(?!q)|(?<!p)q|x(?!y)|(?<!x)y)*?[aeiou](?:a(?!b)|(?<!a)b|c(?!d)|(?<!c)d|[e-or-wz]|p(?!q)|(?<!p)q|x(?!y)|(?<!x)y)*?){3})(?=(?:a(?!b)|(?<!a)b|c(?!d)|(?<!c)d|[e-or-wz]|p(?!q)|(?<!p)q|x(?!y)|(?<!x)y)*?(?<first>[a-z])\k<first>)(?:a(?!b)|(?<!a)b|c(?!d)|(?<!c)d|[e-or-wz]|p(?!q)|(?<!p)q|x(?!y)|(?<!x)y)+$/gmv);

console.info([...matches].length);
