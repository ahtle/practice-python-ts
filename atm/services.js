import { Transaction, transactionType, transactionStatus } from "./models";

export class ATMService {
  #accounts;
  #transactions;

  constructor(accounts, transactions) {
    this.#accounts = accounts;
    this.#transactions = transactions;
  }

  getBalance(accountId) {
    const account = this.#accounts.getById(accountId);
    return account.balance;
  };

  getAccountTransactions(accountId) {
    return this.#transactions.getAccountTransactions(accountId);
  };

  #mutateBalance({ accountId, amount, type, apply }) {
    const account = this.#accounts.getById(accountId);
    const t = new Transaction({ accountId, type, amount });
    this.#transactions.save(t);
    t.status = transactionStatus.PROCESSING;

    try {
      apply(account, amount);
      t.status = transactionStatus.SUCCESS;
    } catch (e) {
      t.status = transactionStatus.FAIL;
      throw new Error(e.message);
    };

    return {
      transaction_id: t.id,
      new_balance: account.balance,
    }
  };

  deposit({accountId, amount}) {
    const _apply = (account, innerAmount) => {
      account.balance += innerAmount;
    };

    return this.#mutateBalance({ 
      accountId, 
      amount, 
      type: transactionType.DEPOSIT,
      apply: _apply,
    });
  };

  withdraw({accountId, amount}) {
    const _apply = (account, innerAmount) => {
      if (innerAmount > account.balance) {
        throw new Error("Insufficient balance");
      };

      account.balance -= innerAmount;
    };

    return this.#mutateBalance({ 
      accountId, 
      amount, 
      type: transactionType.WITHDRAW,
      apply: _apply,
    });
  };
}
