import { Account, AccountRepository, TransactionRepository } from "./models";
import { ATMService } from "./services";

// setup
const a1 = new Account({ id: "a1", balance: 100 });
const a2 = new Account({ id: "a2", balance: 200 });
const accountRepo = new AccountRepository([a1, a2]);
const transactionRepo = new TransactionRepository();

const atmService = new ATMService(accountRepo, transactionRepo);

// endpoints
const getBalanceEndpoint = (accountId) => {
    try {
        const balance = atmService.getBalance(accountId);
        return balance;
    } catch (e) {
        console.error(e);
        // return UI friendly message;
    };
};

const depositEndpoint = (accountId, amount) => {
    try {
        const balance = atmService.deposit({accountId, amount});
        return balance;
    } catch (e) {
        console.error(e);
        // return UI friendly message;
    };
};

const withdrawEndpoint = (accountId, amount) => {
    try {
        const balance = atmService.withdraw({accountId, amount});
        return balance;
    } catch (e) {
        console.error(e);
        // return UI friendly message;
    };
};

console.log(depositEndpoint( a1.id, 100));
console.log(withdrawEndpoint( a1.id, 50));
console.log(getBalanceEndpoint(a1.id)); // 150
console.log(withdrawEndpoint( a1.id, 151));
console.log(atmService.getAccountTransactions(a1.id));
