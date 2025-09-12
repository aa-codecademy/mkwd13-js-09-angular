export interface BudgetApiResponse {
  createdAt: Date;
  fromDate: Date;
  id: number;
  name: string;
  toDate: Date;
  totalAmount: number;
  updatedAt: Date;
  userId: number;
}

export interface CreateBudgetDto {
  name: string;
  totalAmount: number;
  fromDate: Date;
  toDate: Date;
}

export class Budget {
  constructor(private readonly props: BudgetApiResponse) {}

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
}
