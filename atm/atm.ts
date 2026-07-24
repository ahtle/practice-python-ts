import { UUID } from "crypto";

// Interview Prompt
// We're building the core transaction engine for an ATM.

// Support:
// Check balance
// Withdraw cash
// Deposit cash

// Business rules:

// Cannot withdraw more than the account balance.
// Cannot withdraw more cash than the ATM currently contains.
// The ATM should dispense bills using available denominations.
// Transactions should update the account balance.
// The system should be extensible for future transaction types (e.g., transfer, bill payment).

// NOTE:
// models: Account, Transactions
// ATMService: getBalance, withdraw, deposit

// models... represent DB tables
type AccountType = "checking" | "saving";

interface AccountParam {
  accountId: string;
  balance: number;
  type: AccountType;
}

class Account {
  accountId: string;
  balance: number;
  type: AccountType;

  constructor(params: AccountParam) {
    const { accountId, balance, type } = params;
    this.accountId = accountId;
    this.balance = balance;
    this.type = type;
  }
}

enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

enum TransactionStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

interface TransactionParams {
  accountId: string;
  type: TransactionType;
  amount: number;
}

class Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;

  constructor(params: TransactionParams) {
    const { accountId, type, amount } = params;
    this.id = crypto.randomUUID();
    this.accountId = accountId;
    this.type = type;
    this.amount = amount;
    this.status = TransactionStatus.PENDING;
  }
}

// repository... handle interaction with model
class AccountRepository {
  private accounts = new Map<string, Account>();

  constructor(accounts: Account[]) {
    for (const a of accounts) {
      this.accounts.set(a.accountId, a);
    }
  }

  public getById(accountId: string): Account {
    if (!this.accounts.has(accountId)) {
      throw new Error("Account not found");
    }
    return this.accounts.get(accountId);
  }
}

class TransactionRepository {
  private transactions = new Map<string, Transaction[]>();

  public save(transaction: Transaction) {
    const accountTransactions =
      this.transactions.get(transaction.accountId) ?? [];

    accountTransactions.push(transaction);
    this.transactions.set(transaction.accountId, accountTransactions);

    console.log(this.transactions.get(transaction.accountId));
  }
}

// handlers
interface TransactionResponse {
  is_success: boolean,
  error_message?: string,
}

abstract class TransactionHandler {
  public abstract execute(account: Account, transaction: Transaction): TransactionResponse;
}

class DepositHanlder implements TransactionHandler {
  private _validate(transaction: Transaction): { is_validated: boolean, error_message: string }  {
    let is_validated = true;
    let error_message = "";

    if (transaction.amount <= 0) {
      transaction.status = TransactionStatus.FAILURE;
      is_validated = false;
      error_message = "Ammount need to be positive";
    };

    return {
      is_validated,
      error_message,
    }
  };

  public execute(account: Account, transaction: Transaction): TransactionResponse {
    transaction.status = TransactionStatus.PROCESSING;

    const { is_validated, error_message } = this._validate(transaction);

    if (!is_validated) {
      return {
        is_success: is_validated, error_message
      };
    };

    account.balance += transaction.amount;
    transaction.status = TransactionStatus.SUCCESS;

    return {
      is_success: true,
    };
  };
};

class WithdrawHandler implements TransactionHandler {
  private _validate(account: Account, transaction: Transaction): { is_validated: boolean, error_message: string } {
    let is_validated = true;
    let error_message = "";
    if (transaction.amount <= 0) {
      transaction.status = TransactionStatus.FAILURE;
      is_validated = false;
      error_message = "Withdrawal amount must be positive";
    };

    if (transaction.amount > account.balance) {
      transaction.status = TransactionStatus.FAILURE;
      is_validated = false;
      error_message = "Insufficient balance";
    };

    return {
      is_validated,
      error_message,
    }
  }

  public execute(account: Account, transaction: Transaction): TransactionResponse {
    transaction.status = TransactionStatus.PROCESSING;

    const { is_validated, error_message } = this._validate(account, transaction);

    if (!is_validated) {
      return {
        is_success: is_validated, error_message
      };
    };

    account.balance -= transaction.amount;
    transaction.status = TransactionStatus.SUCCESS;
    return {
      is_success: true,
    }
  };
};

// services
class ATMService {
  private accounts: AccountRepository;
  private transactions: TransactionRepository;
  private transactionHandler = new Map<TransactionType, TransactionHandler>([
    [TransactionType.DEPOSIT, new DepositHanlder()],
    [TransactionType.WITHDRAW, new WithdrawHandler()],
  ]);

  constructor(
    accounts: AccountRepository,
    transactions: TransactionRepository,
  ) {
    this.accounts = accounts;
    this.transactions = transactions;
  }

  public getBalance(accountId: string): number {
    const account = this.accounts.getById(accountId);
    return account.balance;
  }

  public handleTransaction(
    accountId: string,
    amount: number,
    transactionType: TransactionType,
  ) {
    const account = this.accounts.getById(accountId);
    const t = new Transaction({ accountId, amount, type: transactionType });

    const handler = this.transactionHandler.get(transactionType);
    if (!handler) {
      throw Error(`unsupported transaction type: ${transactionType}`);
    }

    const { is_success, error_message } = handler.execute(account, t);
    this.transactions.save(t);

    if (error_message) {
      console.error(error_message);
    }
  }
}

const a1 = new Account({ accountId: "a1", balance: 100, type: "checking" });
const a2 = new Account({ accountId: "a2", balance: 200, type: "saving" });
const accountRepo = new AccountRepository([a1, a2]);
const transactionRepo = new TransactionRepository();

const atmService = new ATMService(accountRepo, transactionRepo);

console.log(atmService.getBalance(a1.accountId)); // 100
atmService.handleTransaction(a1.accountId, 50, TransactionType.DEPOSIT);
console.log(atmService.getBalance(a1.accountId)); // 150
atmService.handleTransaction(a1.accountId, -50, TransactionType.DEPOSIT); // FAIL but is saved to transactions
console.log(atmService.getBalance(a1.accountId)); // 150


atmService.handleTransaction(a1.accountId, 100, TransactionType.WITHDRAW);
console.log(atmService.getBalance(a1.accountId)); // 50
