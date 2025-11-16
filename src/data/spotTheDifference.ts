export interface Difference {
  id: string;
  x: number; // Position as percentage (0-100)
  y: number; // Position as percentage (0-100)
  radius: number; // Click detection radius as percentage
  hint?: string;
}

export interface SpotTheDifferenceData {
  level: number;
  originalImage: string;
  modifiedImage: string;
  differences: Difference[];
  timeLimit?: number; // Optional time limit in seconds
}

export const spotTheDifferenceGames: SpotTheDifferenceData[] = [
  {
    level: 2,
    originalImage: 'https://www.puzzlesandriddles.com/Pics/LetsGetMedieval-Left.jpg',
    modifiedImage: 'https://www.puzzlesandriddles.com/Pics/LetsGetMedieval-Right.jpg',
    differences: [
      {
        id: 'diff-1',
        x: 27.2,
        y: 37.3,
        radius: 10,
        hint: 'Check the left side middle area',
      },
      {
        id: 'diff-2',
        x: 87.5,
        y: 48.6,
        radius: 10,
        hint: 'Look at the far right side',
      },
      {
        id: 'diff-3',
        x: 37.1,
        y: 77.5,
        radius: 10,
        hint: 'Near the bottom left',
      },
      {
        id: 'diff-4',
        x: 90.1,
        y: 78.6,
        radius: 10,
        hint: 'Bottom right corner',
      },
      {
        id: 'diff-5',
        x: 53.6,
        y: 5.2,
        radius: 10,
        hint: 'Top center area',
      },
    ],
  },
];
