export interface WordSearchWord {
  word: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface WordSearchData {
  level: number;
  title: string;
  description: string;
  gridSize: number;
  grid: string[][];
  words: WordSearchWord[];
}

export const wordSearchGames: WordSearchData[] = [
  {
    level: 4,
    title: 'Birthday Word Hunt',
    description: 'Find all the birthday-themed words hidden in the grid!',
    gridSize: 10,
    grid: [
      ['M', 'P', 'A', 'R', 'T', 'Y', 'C', 'A', 'K', 'E'],
      ['I', 'Z', 'Q', 'W', 'F', 'R', 'A', 'B', 'F', 'T'],
      ['L', 'B', 'A', 'L', 'L', 'O', 'O', 'N', 'S', 'H'],
      ['A', 'K', 'J', 'H', 'S', 'T', 'N', 'P', 'U', 'G'],
      ['C', 'E', 'L', 'E', 'B', 'R', 'A', 'T', 'E', 'X'],
      ['Y', 'L', 'P', 'N', 'H', 'Z', 'D', 'X', 'N', 'I'],
      ['R', 'O', 'S', 'V', 'H', 'A', 'P', 'P', 'Y', 'F'],
      ['F', 'W', 'W', 'I', 'S', 'H', 'E', 'S', 'M', 'T'],
      ['R', 'N', 'G', 'I', 'F', 'T', 'S', 'K', 'J', 'S'],
      ['I', 'S', 'S', 'M', 'I', 'L', 'E', 'F', 'U', 'N'],
    ],
    words: [
      // Horizontal words
      {
        word: 'PARTY',
        startRow: 0,
        startCol: 1,
        endRow: 0,
        endCol: 5,
      },
      {
        word: 'CAKE',
        startRow: 0,
        startCol: 6,
        endRow: 0,
        endCol: 9,
      },
      {
        word: 'BALLOONS',
        startRow: 2,
        startCol: 1,
        endRow: 2,
        endCol: 8,
      },
      {
        word: 'CELEBRATE',
        startRow: 4,
        startCol: 0,
        endRow: 4,
        endCol: 8,
      },
      {
        word: 'HAPPY',
        startRow: 6,
        startCol: 4,
        endRow: 6,
        endCol: 8,
      },
      {
        word: 'WISHES',
        startRow: 7,
        startCol: 2,
        endRow: 7,
        endCol: 7,
      },
      {
        word: 'GIFTS',
        startRow: 8,
        startCol: 2,
        endRow: 8,
        endCol: 6,
      },
      {
        word: 'SMILE',
        startRow: 9,
        startCol: 2,
        endRow: 9,
        endCol: 6,
      },
      {
        word: 'FUN',
        startRow: 9,
        startCol: 7,
        endRow: 9,
        endCol: 9,
      },
      // Vertical words
      {
        word: 'MILA',
        startRow: 0,
        startCol: 0,
        endRow: 3,
        endCol: 0,
      },
    ],
  },
];
