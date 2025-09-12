import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;
}
