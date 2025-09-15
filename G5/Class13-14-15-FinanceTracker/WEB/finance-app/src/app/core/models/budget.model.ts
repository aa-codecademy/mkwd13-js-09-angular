export interface Transactions {
  amount: string;
  budgetId: number;
  createdAt: Date;
  date: Date;
  description: string;
  id: number;
  title: string;
  type: 'expense' | 'income';
  updatedAt: Date;
}

export interface BudgetApiResponse {
  createdAt: Date;
  fromDate: Date;
  id: number;
  name: string;
  toDate: Date;
  totalAmount: number;
  updatedAt: Date;
  userId: number;
  transactions?: Transactions[];
}

// IF WE SEPARATE TYPES
export type BudgetDetailsApiResponse = BudgetApiResponse & { transactions: Transactions[] };

export type BudgetCreateProps = BudgetApiResponse | BudgetDetailsApiResponse;

export interface CreateBudgetDto {
  name: string;
  totalAmount: number;
  fromDate: Date;
  toDate: Date;
}

export class Budget {
  constructor(private props: BudgetApiResponse) {}

  static create(props: BudgetApiResponse): Budget {
    return new Budget(props);
  }

  name(): string {
    return this.props.name;
  }

  id(): number {
    return this.props.id;
  }

  budgetStatus(): 'upcoming' | 'expired' | 'active' {
    const now = new Date();
    const fromDate = new Date(this.props.fromDate);
    const toDate = new Date(this.props.toDate);

    if (now < fromDate) return 'upcoming';
    if (now > toDate) return 'expired';

    return 'active';
  }

  totalAmount() {
    return this.props.totalAmount;
  }

  fromDate() {
    return this.props.fromDate;
  }

  toDate() {
    return this.props.toDate;
  }

  totalSpent(): number {
    const expenses = this.filterAmountBy('expense');

    return this.countAmount(expenses);
  }

  totalIncome(): number {
    const incomes = this.filterAmountBy('income');

    return this.countAmount(incomes);
  }

  remainingAmount(): number {
    return this.totalAmount() + this.totalIncome() - this.totalSpent();
  }

  private filterAmountBy(transactionType: 'expense' | 'income') {
    return this.transactions().filter((transaction) => transaction.type === transactionType);
  }

  private countAmount(transactions: Transactions[]) {
    let count = 0;

    for (const transaction of transactions) {
      count += Number(transaction.amount);
    }

    return count;
  }

  // IF WE USE SEPARATE TYPES FOR CREATING BUDGET
  // transaction(): Transactions[] {
  //   if ('transactions' in this.props) {
  //     return this.props.transactions;
  //   }
  //   return [];
  // }

  transactions(): Transactions[] {
    return this.props.transactions || [];
  }

  addTransaction(transaction: Transactions) {
    this.props.transactions = [...this.transactions(), transaction];

    return this; // returns budget object
  }

  daysRemaining(): number {
    const today = new Date();
    const endDate = new Date(this.toDate());
    const diffTime = endDate.getTime() - today.getTime();

    const msInDay = 1000 * 60 * 60 * 24;

    const diffDays = diffTime / msInDay;
    const wholeDays = Math.floor(diffDays);

    return wholeDays;
  }
}
