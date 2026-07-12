// Behavior:

// User inserts one or more coins.
// User selects a product.
// If enough money was inserted and the product is in stock:
// dispense the product
// deduct inventory
// return any change
// Otherwise, do not dispense.

// Assume:

// Infinite change is available.
// Single-threaded.
// In-memory.

enum Coin {
    NICKLE = 5,
    DIME = 10,
    QUARTER = 25,
    DOLLAR = 100,
}

enum ProductName {
    COKE = "COKE",
    PEPSI = "PEPSI",
    DR_PEPPER = "DR_PEPPER",
}

interface Product {
    id: ProductName,
    cost: number,
    inventory: number,
}

class VendingMachine {
    public productMap = new Map<ProductName, Product>();
    public currentBalance: number = 0;
    public lastDispensed: ProductName | null = null;
    
    constructor(productList: Product[]) {
        for (const item of productList) {
            this.productMap.set(item.id, { ...item })
        }
    }

    insertCoin(coin: Coin): void {
        this.currentBalance += coin;
    };

    selectProduct(productId: ProductName): PurchaseResult {
        const productSelected = this.productMap.get(productId);

        // if product have no inventory
        if (!productSelected?.inventory) {
            return {
                success: false,
                change: 0
            };
        }

        // if user did not put in enough coins
        if (this.currentBalance < productSelected.cost) {
            return {
                success: false,
                change: 0,
            };
        }

        --productSelected.inventory;
        this.lastDispensed = productId;
        const change = this.currentBalance - productSelected.cost;
        this.currentBalance = 0;
        return {
            success: true,
            change,
        };
    };

    refund(): number {
        const refundAmount = this.currentBalance;
        this.currentBalance = 0;
        return refundAmount;
    };


    /** 
     * returns the last dispensed product, or null if there isn't one waiting.
     * model user take the product out of the machine.
    */
    collectProduct(): ProductName | null {
        const product = this.lastDispensed;
        this.lastDispensed = null;
        return product;
    }
}

const v = new VendingMachine([
    { id: ProductName.COKE, cost: 100, inventory: 10},
    { id: ProductName.PEPSI, cost: 90, inventory: 9},
    { id: ProductName.DR_PEPPER, cost: 80, inventory: 8},
]);

v.insertCoin(Coin.DIME);
console.log(v.selectProduct(ProductName.COKE)); // { success: false, refund: 0 }
console.log("current coins", v.currentBalance); // 10
v.insertCoin(Coin.DOLLAR);
console.log(v.selectProduct(ProductName.COKE));  // { success: true, refund: 10 }
console.log(v.productMap);
console.log("current coins", v.currentBalance); // 0
console.log("last dispensed", v.collectProduct()); // COKE
