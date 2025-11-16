export interface PuzzleData {
  level: number;
  title: string;
  description: string;
  imageUrl: string;
  gridSize: 3 | 4; // 3x3 or 4x4 grid
}

export const puzzleGames: PuzzleData[] = [
  {
    level: 5,
    title: 'Birthday Celebration Puzzle',
    description: 'Slide the tiles to complete the birthday image!',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop',
    gridSize: 3, // 3x3 grid = 9 tiles (8 movable + 1 empty)
  },
];
