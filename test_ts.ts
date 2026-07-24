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


// Find the first non-repeating character

const firstNonRepeating = (str: string): (string | false) => {
    if (!str) return false;
    let lastSeen = str.charAt(0);
    for (let i = 1; i < str.length; i++) {
        const char = str.charAt(i);
        if (char !== lastSeen) {
            return char;
        }
        lastSeen = char;
    }
    return false;
};

console.log("firstNonRepeating", firstNonRepeating("aaabcdefg")) // b

// Check if two strings are anagrams. e.g. strings that have same chars but arranged differently
const isAnagram = (strA: string, strB: string): boolean => {
    if (strA.length !== strB.length) {
        return false;
    };

    // const strAOrdered = strA.split("").sort().join("");
    // const strBOrdered = strB.split("").sort().join("");
    // return strAOrdered === strBOrdered;

    const charCountMap = new Map<string, number>();
    for (const char of strA) {
        charCountMap.set(char, (charCountMap.get(char) || 0) + 1);
    };

    for (const char of strB) {
        if (!charCountMap.has(char)) return false;
        charCountMap.set(char, charCountMap.get(char)! - 1);

        if (charCountMap.get(char) === 0) {
            charCountMap.delete(char);
        };
    };

    return charCountMap.size === 0;
};

const strA = "listen";
const strB = "silent";
console.log("isAnagram", isAnagram(strA, strB)) // true
console.log("isAnagram", isAnagram("abc", "cba1")) // false

// check if a strings is a palindrone. e.g. racecar's reverse is racecar';
const isPalindrome = (str: string): boolean => {
    const reverse = str.split("").reverse().join("");

    return str === reverse;
};

// Remove duplicates from an array
const removeArrDup = (arr: number[]): number[] => {
    if (!arr.length) return arr;
    const res = new Set(arr);
    return [...res];
};

// Move all zeros to the end
const moveAllZeroToEnd = (arr: number[]): number[] => {
    const res = new Array(arr.length).fill(0);

    let index = 0;
    for (const val of arr) {
        if (val !== 0) {
            res[index] = val;
            index++;
        }
    }

    return res;
};

const freqCounter = (str: string): Map<string, number> => {
    const res = new Map<string, number>();
    for (const char of str) {
        res.set(char, (res.get(char) || 0) +1);
    };
    return res;
};

const fib = (num: number): number => {
    if (num <= 1) return num;
    return fib(num - 1) + fib(num - 2);
};

console.log('fib(2)', fib(2)); // 0 + 1 = 1;
console.log('fib(5)', fib(5)); // 5;
