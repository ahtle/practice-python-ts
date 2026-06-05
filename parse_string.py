def parse_string(s: str) -> dict:
    res = {}
    list_s = s.split(";")

    for item in list_s:
        k, v = item.split("=")
        res[k] = v

    return res


print(parse_string("name=John;age=25;city=San Diego"))