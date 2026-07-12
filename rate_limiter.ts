// class RateLimiter {
//     private successRequestsAt: Array<number | null>;
//     private readonly rate: number;
//     private readonly rateWindow: number;

//     public constructor(options: { rate: number,  rateWindow: number}) {
//         const { rate, rateWindow } = options;
//         this.rate = rate;
//         this.rateWindow = rateWindow;
//         this.successRequestsAt = new Array(rate).fill(null)
//     }

//     public allowRequest = (event: string, time: number) : boolean => {
//         // check for expired requests
//         this.successRequestsAt.forEach((t, i) => {
//             if (t && time - t > this.rateWindow) {
//                 this.successRequestsAt[i] = null;
//             }
//         });

//         // case: too many active requests
//         if (this.successRequestsAt.filter((t) => t !== null).length >= this.rate) {
//             return false;
//         }

//         let firstAvailableIndex = this.successRequestsAt.findIndex((t) => t === null);
//         this.successRequestsAt[firstAvailableIndex] = time;
//         return true;
//     }
// }

// const rl = new RateLimiter({rate: 3, rateWindow: 10})
// console.log(rl.allowRequest("test", 1)); // true
// console.log(rl.allowRequest("test", 2)); // true
// console.log(rl.allowRequest("test", 3)); // true
// console.log(rl.allowRequest("test", 9)); // false
// console.log(rl.allowRequest("test", 11)); // false
// console.log(rl.allowRequest("test", 12)); // true


type Request = Map<string, number[]>;

class RateLimiter {
    private readonly rate: number; // number of allowed request per rateWindow
    private readonly rateWindow: number; // sliding window in seconds
    private requests: Request // map userId to requests list 

    public constructor(options: { rate: number, rateWindow: number }) {
        const { rate, rateWindow } = options;
        this.rate = rate;
        this.rateWindow = rateWindow;
        this.requests = new Map<string, number[]>();
    }

    public allow(userId: string): boolean {
        const currentTime = Date.now(); // in ms

        // get user
        const userRequests = this.requests.get(userId) ?? [];

        // remove expired requests
        while (userRequests.length && ((currentTime - userRequests[0]) > (this.rateWindow * 1000))) {
            userRequests.shift();
        }

        // check if userRequests is already filled
        if (userRequests.length >= this.rate) return false;

        userRequests.push(currentTime);
        this.requests.set(userId, userRequests);
        return true;
    }
}

const rl = new RateLimiter({ rate: 3, rateWindow: 10 }); // 3 requests per 10s window
console.log(rl.allow("test")); // true
console.log(rl.allow("test")); // true
console.log(rl.allow("test")); // true
console.log(rl.allow("test")); // false
console.log(rl.allow("test")); // false
console.log(rl.allow("test2")); // true
