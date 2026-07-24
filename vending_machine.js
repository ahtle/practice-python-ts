const productName = Object.freeze({
    COKE: "COKE",
    PEPSI: "PEPSI",
    DR_PEPPER: "DR_PEPPER",
});

const coin = Object.freeze({
    NICKLE: 5,
    DIME: 10,
    QUARTER: 25,
    DOLLAR: 100,
});

class VendingMachine {
    currentBalance = 0;
    productMap = new Map();
    
    constructor(productList) {
        for (const item of productList) {
            this.productMap.set(item.id, {...item});
        }
    };

    test() {
        for(const [k,v] of this.productMap) {
            console.log(k, v);
        }
    };

    insertCoin(coin) {
        this.currentBalance += coin;
    };
}

const v = new VendingMachine([
    { id: productName.COKE, cost: 100, inventory: 10 },
    { id: productName.PEPSI, cost: 90, inventory: 10 },
    { id: productName.DR_PEPPER, cost: 80, inventory: 10 },
]);

v.insertCoin(coin.NICKLE);
v.insertCoin(coin.QUARTER);
console.log(v.currentBalance);