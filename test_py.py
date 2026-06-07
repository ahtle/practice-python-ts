from collections import Counter, defaultdict

def parse_string(s: str) -> dict:
    """ given a csv style string, convert to dict """

    res = {}
    list_s = s.split(";")

    for item in list_s:
        k, v = item.split("=")
        res[k] = v

    return res

print("parse_string", parse_string("name=John;age=25;city=San Diego"))


# ---------------------------------------

def first_unique(s: str) -> str:
    """ find the first unique char in a string """

    if not s:
        return "" 

    count = Counter (s)
    for char in s:
        if count.get(char) == 1:
            return char

    return ""

print("first_unique", first_unique("abcdcba"))


# ---------------------------------------

def two_sum(nums: list[int], target: int):
    """ Given a list of integers and a target, 
    return indices of two numbers that add up to the target. 
    
    e.g. nums = [2, 7, 11, 15]
    target = 9
    return [0, 1]
    """

    seen = dict[int, int]()
    for index, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], index]

        seen[n] = index

    return []

nums = [2, 7, 11, 15]
print("two_sum" ,two_sum(nums, 18)) # [1,2]


# ---------------------------------------

def isParenBalanced(s: str) -> bool:
    """
    Given a string containing only: () [] {}
    determine whether the parentheses are balanced.
    """

    PAIRS = {
        ")": "(",
        "]": "[",
        "}": "{",
    }
    stack = []

    for char in s:
        if char in ["(", "{", "["]:
            stack.append(char)
        elif stack.pop() != PAIRS[char]:
            return False

    return len(stack) == 0;

print("isParenBalanced", isParenBalanced("()")) # true
print("isParenBalanced", isParenBalanced("()[]{}")) # true
print("isParenBalanced", isParenBalanced("(]")) # false
print("isParenBalanced", isParenBalanced("([{}])")) # true


# ---------------------------------------

def groupAnagrams(string_list: list[str]) -> list[list[str]]:
    """
    Given an array of strings, group words that are anagrams.
    e.g. eat, tea, ate
    """

    groups = defaultdict(list)
    for word in string_list:
        key = ''.join(sorted(word))
        groups[key].append(word)
        
    return list(groups.values())

ANAGRAM_LIST = [
    "eat",
    "tea",
    "tan",
    "ate",
    "nat",
    "bat",
];
print("groupAnagrams", groupAnagrams(ANAGRAM_LIST))

# [
#     ["eat", "tea", "ate"],
#     ["tan", "nat"],
#     ["bat"]
# ]

# ---------------------------------------

def longestConsecutive(num_list: list[int]) -> int:
    """
    Given an unsorted array, return the length of the longest consecutive sequence.
    """

    num_set = set(num_list)
    longest = 0
    for n in num_list:
        if n - 1 not in num_set:
            current = n
            length = 1
            
            while current + 1 in num_set:
                current += 1
                length += 1

            longest = max(longest, length)

    return longest

print("longestConsecutive", longestConsecutive([100, 4, 200, 1, 3, 2])) # 4