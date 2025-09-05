import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) { }

  async create(
    createBudgetDto: CreateBudgetDto,
    userId: number,
  ): Promise<Budget> {
    const budget = this.budgetRepository.create({
      ...createBudgetDto,
      userId,
    });
    return await this.budgetRepository.save(budget);
  }

  async findAll(userId: number): Promise<Budget[]> {
    return await this.budgetRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      // relations: ['transactions'],
    });
  }

  async findOne(id: number, userId: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { id, userId },
      relations: ['transactions'],
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async findBudgetWithTransactions(
    id: number,
    userId: number,
  ): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { id, userId },
      relations: ['transactions'],
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async update(
    id: number,
    updateBudgetDto: UpdateBudgetDto,
    userId: number,
  ): Promise<Budget> {
    const budget = await this.findOne(id, userId);

    Object.assign(budget, updateBudgetDto);
    budget.updatedAt = new Date();

    return await this.budgetRepository.save(budget);
  }

  async remove(id: number, userId: number): Promise<void> {
    const budget = await this.findOne(id, userId);
    await this.budgetRepository.remove(budget);
  }
}
