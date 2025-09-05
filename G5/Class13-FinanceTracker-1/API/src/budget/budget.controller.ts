import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) { }

  @Post()
  async create(
    @Body() createBudgetDto: CreateBudgetDto,
    @User('sub') userId: number,
  ): Promise<Budget> {
    return await this.budgetService.create(createBudgetDto, userId);
  }

  @Get()
  async findAll(@User('sub') userId: number): Promise<Budget[]> {
    return await this.budgetService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @User('sub') userId: number,
  ): Promise<Budget> {
    return await this.budgetService.findOne(id, userId);
  }

  @Get(':id/transactions')
  async findBudgetTransactions(
    @Param('id', ParseIntPipe) id: number,
    @User('sub') userId: number,
  ) {
    return await this.budgetService.findBudgetWithTransactions(id, userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
    @User('sub') userId: number,
  ): Promise<Budget> {
    return await this.budgetService.update(id, updateBudgetDto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User('sub') userId: number,
  ): Promise<void> {
    return await this.budgetService.remove(id, userId);
  }

  // Premium feature for loyal customers
  @UseGuards(RolesGuard)
  @Roles(UserRole.LOYAL_CUSTOMER)
  @Get('export/pdf')
  exportToPdf() {
    return {
      message: 'PDF export successful for loyal customers',
      downloadUrl: '/downloads/budget-report.pdf',
      format: 'PDF',
      reportType: 'Budget Summary Report',
    };
  }
}
