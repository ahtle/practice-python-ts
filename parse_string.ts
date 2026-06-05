type ObjKey = Record<string, string> 

const parse_string = (s: string): ObjKey => {
    const res: ObjKey = {}
    for (const item of s.split(";")) {
        const [k, v] = item.split("=");
        if (k !== undefined && v !== undefined) {
            res[k] = v;
        }
    }

    return res;
}

console.log(parse_string("name=John;age=25;city=San Diego"))