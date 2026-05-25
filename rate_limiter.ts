class RateLimiter {
    private successRequestsAt: Array<number | null>;
    private readonly rate: number;
    private readonly rateWindow: number;

    public constructor(options: { rate: number,  rateWindow: number}) {
        const { rate, rateWindow } = options;
        this.rate = rate;
        this.rateWindow = rateWindow;
        this.successRequestsAt = new Array(rate).fill(null)
    }

    public allowRequest = (event: string, time: number) : boolean => {
        // check for expired requests
        this.successRequestsAt.forEach((t, i) => {
            if (t && time - t > this.rateWindow) {
                this.successRequestsAt[i] = null;
            }
        });

        // case: too many active requests
        if (this.successRequestsAt.filter((t) => t !== null).length >= this.rate) {
            return false;
        }

        let firstAvailableIndex = this.successRequestsAt.findIndex((t) => t === null);
        this.successRequestsAt[firstAvailableIndex] = time;
        return true;
    }
}


const rl = new RateLimiter({rate: 3, rateWindow: 10})

console.log(rl.allowRequest("test", 1)); // true
console.log(rl.allowRequest("test", 2)); // true
console.log(rl.allowRequest("test", 3)); // true
console.log(rl.allowRequest("test", 9)); // false
console.log(rl.allowRequest("test", 11)); // false
console.log(rl.allowRequest("test", 12)); // true