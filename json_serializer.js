// input a json
// output obj

import test_data from './test_data.json';

const jsonSerializer = () => {

    const subFuncAny = (str) => {
        console.log(typeof(str));
    };

    const subFunc = (str) => {
        // if "" at beginning, parse out and return
        // str === '"abc123e$@!"ASDF1233' -> 'abc'
        let secondIndex;
        for (let i = 1; i < str.length; i++) {
            if (str.charAt(i) === '"') {
                secondIndex = i;
                break;
            }
        };
        const sub = str.substring(1, secondIndex);
        const restOfString = str.substring(secondIndex);
        return {
            sub,
            restOfString,
        }
    };

    const strJson = JSON.stringify(test_data);
    const clean1 = strJson.substring(1, strJson.length - 1); 
    console.log(clean1);

    const { sub, restOfString } = subFunc(clean1); // rest = obj"
    console.log(restOfString);



    // console.log(sub);


    // const keys = [];
    // const values = [];
    // for (let i = 0; i < clean1.length; i++) {
    //     let char = clean1.charAt(i);
    //     if (char === '"'){
    //         keys.push(i);
    //     }
    // };
    // for (let i; i < keys.length - 2; i += 2) {
    //     const sub = clean1.substring(keys[i], keys[i+1]);
    //     console.log(sub);
    // }

    // console.log(keys);
};

jsonSerializer();