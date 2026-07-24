export const transactionType = Object.freeze({
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
});

export const transactionStatus = Object.freeze({
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
});


// models
export class Account {
  constructor({ id, balance }) {
    ((this.id = id), (this.balance = balance));
  }
}

export class Transaction {
  constructor({ accountId, type, amount }) {
    if (!(type in transactionType)) {
      throw new Error(`Unsupported transaction type ${type}`);
    };
    
    if (amount < 0) {
      throw new Error('Please enter a positive amount');
    }

    this.id = crypto.randomUUID();
    this.accountId = accountId,
    this.type = type;
    this.amount = amount;
    this.status = transactionStatus.PENDING;
  }
}

// repo
export class AccountRepository {
  constructor(accounts) {
    this.accounts = new Map();
    for (const a of accounts) {
      this.accounts.set(a.id, a);
    };
  };

  getById(accountId) {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw Error("Account not found");
    };
    return account;
  };
};

export class TransactionRepository {
  constructor() {
    this.transactions = new Map(); // accountId: Map<transactionId, Transaction>
  };

  getAccountTransactions(accountId) {
    return this.transactions.get(accountId);
  };

  save(transaction) {
    const transactionMap = this.transactions.get(transaction.accountId) ?? new Map();
    transactionMap.set(transaction.id, transaction);
    this.transactions.set(transaction.accountId, transactionMap);
  };

  update(updatedTransaction) {
    const transactionMap = this.transactions.get(transaction.accountId);
    if (!transactionMap) {
      throw new Error("Transaction not found");
    };

    transactionMap.set(updatedTransaction.id, updatedTransaction);
  }
};
