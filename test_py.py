from collections import Counter

def parse_string(s: str) -> dict:
    """ given a csv style string, convert to dict """

    res = {}
    list_s = s.split(";")

    for item in list_s:
        k, v = item.split("=")
        res[k] = v

    return res

print(parse_string("name=John;age=25;city=San Diego"))


def first_unique(s: str) -> str | None:
    """ find the first unique char in a string """

    if not s:
        return None

    count = Counter (s)
    for char in s:
        if count.get(char) == 1:
            return char

    return None

print(first_unique("abcdcba"))