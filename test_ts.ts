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

console.log(parseString("name=John;age=25;city=San Diego"))


// ------------------------------

/**
 * given a string, return the first unique char
 * 
 * @param string
 * @returns string 
 */
function firstUnique(s: string): string {
    if (!s) return ""

    const countMap = new Map()
    for (const c of s) {
        const currentCount = countMap.get(c) ?? 0;
        countMap.set(c, currentCount + 1);
    }

    for (const c of s) {
        if (countMap.get(c) === 1) return c;
    }
    return ""
}

console.log(firstUnique("abcdcba")); // d
console.log(firstUnique("abecdcba")); // e