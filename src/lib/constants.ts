/**
 * Application constants
 * Single source of truth for configuration values
 */

// Game Configuration
export const GAME_CONFIG = {
  TOTAL_LEVELS: 6,
  TOTAL_GIFTS: 6,
  FIRST_LEVEL_ID: 1,
} as const;

// Collision Detection
export const COLLISION = {
  DEFAULT_RADIUS: 8, // Default click radius for games
  TOUCH_RADIUS: 12,  // Larger radius for touch devices
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  CONFETTI: 3000,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  GAME_PROGRESS: 'mila-birthday-progress',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  GAME: (levelId: number) => `/game/${levelId}`,
  RIDDLE: (level: number) => `/riddle/${level}`,
  GREETING: '/greeting',
  GREETING_FLOWER: '/greeting-flower',
  GREETING_LOCUS: '/greeting-locus',
  GREETING_LOCUS_ORIGIN: '/greeting-locus-origin',
  GREETING_NOMADIC: '/greeting-nomadic',
  GREETING_OTHER: '/greeting-other',
} as const;

// Game Types
export const GAME_TYPES = {
  MEMORY: 'memory',
  SPOT_DIFFERENCE: 'spot-difference',
  HIDDEN_OBJECTS: 'hidden-objects',
  WORD_SEARCH: 'word-search',
  PUZZLE: 'puzzle',
} as const;

// Birthday Theme Colors (for confetti, etc.)
export const THEME_COLORS = {
  LAVENDER: '#ede8f5',
  LIGHT_BLUE: '#adbbda',
  PERIWINKLE: '#8697c4',
  SKY_BLUE: '#7091e6',
  DEEP_BLUE: '#3d52a0',
} as const;

// Get all colors as array
export const THEME_COLORS_ARRAY = Object.values(THEME_COLORS);

// Developer Mode (for coordinate logging)
export const DEV_MODE = {
  ENABLED: process.env.NODE_ENV === 'development',
  COORDINATE_LOGGING: false, // Toggle in game components
} as const;

// Messages
export const MESSAGES = {
  GAME_COMPLETE: "Congratulations! You've completed the game!",
  LEVEL_COMPLETE: 'Level Complete! Moving to riddle...',
  LEVEL_LOCKED: 'Complete previous levels to unlock this one.',
  WRONG_ANSWER: 'Not quite! Try again.',
  ALL_GIFTS_COLLECTED: "You've found all the gifts!",
} as const;
