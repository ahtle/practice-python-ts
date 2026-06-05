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