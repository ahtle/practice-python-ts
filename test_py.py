from collections import Counter

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