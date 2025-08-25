export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  createdDate: Date;
  difficulty: Difficulty;
}

export interface CreateRecipeDto {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  difficulty: Difficulty;
}

export type UpdateRecipeDto = CreateRecipeDto;
