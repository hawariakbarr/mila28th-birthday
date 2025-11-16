export interface HiddenObject {
  id: string;
  name: string;
  x: number; // Position as percentage (0-100)
  y: number; // Position as percentage (0-100)
  radius: number; // Click detection radius as percentage
  emoji?: string; // Optional emoji to show in the list
}

export interface HiddenObjectsData {
  level: number;
  sceneImage: string;
  title: string;
  description: string;
  objects: HiddenObject[];
  timeLimit?: number; // Optional time limit in seconds
}

export const hiddenObjectsGames: HiddenObjectsData[] = [
  {
    level: 3,
    sceneImage: '/images/magical-library.png',
    title: 'Magical Library',
    description: 'Find all the hidden magical objects in this enchanted study!',
    objects: [
      {
        id: 'obj-1',
        name: 'Compass',
        x: 57.6,
        y: 91.2,
        radius: 8,
        emoji: '🧭',
      },
      {
        id: 'obj-2',
        name: 'Horse Hooves',
        x: 84.4,
        y: 36.7,
        radius: 8,
        emoji: '🐴',
      },
      {
        id: 'obj-3',
        name: 'Flower Pot',
        x: 6.2,
        y: 49.6,
        radius: 8,
        emoji: '🪴',
      },
      {
        id: 'obj-4',
        name: 'Spider Web',
        x: 3.0,
        y: 19.5,
        radius: 8,
        emoji: '🕸️',
      },
      {
        id: 'obj-5',
        name: 'Small Clock',
        x: 95.4,
        y: 51.7,
        radius: 8,
        emoji: '⏰',
      },
      {
        id: 'obj-6',
        name: 'Bird Statue',
        x: 26.9,
        y: 29.6,
        radius: 8,
        emoji: '🦅',
      },
      {
        id: 'obj-7',
        name: 'Bell',
        x: 19.8,
        y: 17.3,
        radius: 8,
        emoji: '🔔',
      },
    ],
  },
];
