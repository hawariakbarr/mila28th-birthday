export interface JigsawPuzzleData {
  level: number;
  title: string;
  description: string;
  imageUrl: string;
  gridSize: 3 | 4; // 3x3 or 4x4 grid
  difficulty: 'easy' | 'medium' | 'hard';
}

export const jigsawPuzzles: JigsawPuzzleData[] = [
  {
    level: 5,
    title: 'Birthday Celebration',
    description: 'Drag the pieces to complete the birthday image!',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop',
    gridSize: 3, // 3x3 grid = 9 pieces
    difficulty: 'easy',
  },
];
