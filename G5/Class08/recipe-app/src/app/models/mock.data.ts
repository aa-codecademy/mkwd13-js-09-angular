import { Difficulty, Recipe } from './recipe.model';

export const DATA: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    ingredients: [
      '400g spaghetti',
      '200g pancetta',
      '4 large eggs',
      '100g Pecorino Romano',
      'Black pepper',
      'Salt',
    ],
    instructions:
      'Cook pasta. Fry pancetta. Mix eggs with cheese. Combine everything off heat.',
    difficulty: Difficulty.MEDIUM,
    imageUrl:
      'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    createdDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Chocolate Chip Cookies',
    description: 'Soft and chewy homemade chocolate chip cookies',
    ingredients: [
      '2 cups flour',
      '1 cup butter',
      '3/4 cup brown sugar',
      '1/2 cup sugar',
      '2 eggs',
      '2 cups chocolate chips',
    ],
    instructions:
      'Mix dry ingredients. Cream butter and sugars. Add eggs. Combine. Add chips. Bake at 375°F for 10 minutes.',
    difficulty: Difficulty.EASY,
    imageUrl:
      'https://images.unsplash.com/photo-1583743089695-4b816a340f82?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    createdDate: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'Caesar Salad',
    description:
      'Fresh romaine lettuce with creamy Caesar dressing and croutons',
    ingredients: [
      '2 romaine hearts',
      '1/2 cup parmesan',
      '1 cup croutons',
      '2 tbsp olive oil',
      '1 lemon',
      '2 anchovy fillets',
      '1 garlic clove',
    ],
    instructions:
      'Make dressing with garlic, anchovies, lemon, and oil. Toss lettuce. Add parmesan and croutons.',
    difficulty: Difficulty.EASY,
    imageUrl:
      'https://images.unsplash.com/photo-1605291535065-e1d52d2b264a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    createdDate: new Date('2024-01-12'),
  },
];
