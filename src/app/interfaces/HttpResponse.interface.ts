export interface LoginResponse {
  user:  User;
  token: string;
}

export interface User {
  uuid_user: string;
  username:  string;
  password:  string;
}

export interface Budget {
  uuid_budget: string;
  uuid_user: string;
  description:  string;
  value:  number;
}

export interface Transaction {
  uuid_transaction: string;
  uuid_budget: string;
  uuid_user: string;
  description:  string;
  value:  number;
}

export interface CreateUserResponse {
  errorCode:    number;
  errorMessage: string;
}

export interface CreateBudgetResponse {
  errorCode:    number;
  errorMessage: string;
}

export interface CreateTransactionResponse {
  errorCode:    number;
  errorMessage: string;
}

export interface BudgetListResponse {
  errorCode:    number;
  errorMessage: string;
  budgets:      Budget[];
}

export interface TransactionListResponse {
  errorCode:    number;
  errorMessage: string;
  transactions: Transaction[];
}

