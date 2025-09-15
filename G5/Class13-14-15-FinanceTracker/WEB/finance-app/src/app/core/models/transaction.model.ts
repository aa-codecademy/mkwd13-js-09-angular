export interface CreateTransactionDto {
  title: string;
  description?: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  budgetId: number;
}
