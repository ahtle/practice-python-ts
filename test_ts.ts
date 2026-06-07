// ------------------------------ 

type ObjKey = Record<string, string> 

/**
 * given a string, convert to dict
 * 
 * @arg s: string
 * @return ObjKey
*/
const parseString = (s: string): ObjKey => {
    const res: ObjKey = {}
    for (const item of s.split(";")) {
        const [k, v] = item.split("=");
        if (k !== undefined && v !== undefined) {
            res[k] = v;
        }
    }

    return res;
}

console.log("parseString", parseString("name=John;age=25;city=San Diego"))


// ------------------------------

/**
 * given a string, return the first unique char
 * 
 * @param string
 * @returns string 
 */
function firstUnique(s: string): string | null {
    if (!s) return null

    const countMap = new Map()
    for (const c of s) {
        const currentCount = countMap.get(c) ?? 0;
        countMap.set(c, currentCount + 1);
    }

    for (const c of s) {
        if (countMap.get(c) === 1) return c;
    }
    return null
}

console.log("firstUnique", firstUnique("leetcode")); // "l"
console.log("firstUnique", firstUnique("loveleetcode")); // "v"
console.log("firstUnique", firstUnique("aabbcc")); // null

// ------------------------------

/**
 * Given a list of integers and a target, 
 * return indices of two numbers that add up to the target. 
 * e.g. nums = [2, 7, 11, 15]
 * target = 9
 * return [0, 1]

 * @param nums
 * @param target 
 * @returns [number, number]
 */
const twoSum = (nums: number[], target: number): [number, number] | [] => {
    const seen = new Map();
    for (const [i, n] of  nums.entries()) {
        const need = target - n;
        if (seen.has(need)) return [seen.get(need), i];
        seen.set(n, i);
    }
    return []
}

const nums = [2, 7, 11, 15]
console.log("twoSum", twoSum(nums, 13));


// -----------------------------------
// Given a string containing only: () [] {}
// determine whether the parentheses are balanced.

const isParenBalanced = (s: string): boolean => {
    if (!s) return false;
    
    const PAIRS = new Map([
        [")", "("],
        ["]", "["],
        ["}", "{"],
    ]);

    const stack: string[] = [];
    for (const char of s) {
        if (["(", "{", "["].includes(char)) {
            stack.push(char);
        } else {
            if (stack.pop() !== PAIRS.get(char)) return false;
        }
    }
    return stack.length === 0;
}

console.log("isParenBalanced", isParenBalanced("()")) // true
console.log("isParenBalanced", isParenBalanced("()[]{}")) // true
console.log("isParenBalanced", isParenBalanced("(]")) // false
console.log("isParenBalanced", isParenBalanced("([{}])")) // true


// -----------------------------------
// Given an array of strings, group words that are anagrams.
// e.g. eat, tea, ate

const groupAnagrams = (list: string[]): string[][] => {
    const groups = new Map<string, string[]>();
    for (const word of list) {
        const key = word.split("").sort().join("");
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(word);
    }
    return [...groups.values()];
}

const ANAGRAM_LIST = [
    "eat",
    "tea",
    "tan",
    "ate",
    "nat",
    "bat",
];
console.log("groupAnagrams", groupAnagrams(ANAGRAM_LIST));

// [
//     ["eat", "tea", "ate"],
//     ["tan", "nat"],
//     ["bat"]
// ]


// -----------------------------------
// Given an unsorted array, return the length of the longest consecutive sequence.

const longestConsecutive = (numList: number[]): number => {
    const set = new Set(numList);
    let longest = 0;

    for (const num of numList) {
        if (!set.has(num - 1)) {
            let current = num;
            let length = 1;

            while(set.has(current + 1)) {
                ++current;
                ++length;
            }

            longest = Math.max(longest, length);
        }
    }
    return longest;
}

console.log("longestConsecutive", longestConsecutive([100, 4, 200, 1, 3, 2])) // 4

