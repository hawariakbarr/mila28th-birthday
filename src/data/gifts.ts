import { Gift } from '@/types';

/**
 * Gift configuration data
 * Note: isCollected is derived from GameProgress.collectedGifts
 * Use useGameProgress.isGiftCollected() to check collection status
 */
export const gifts: Gift[] = [
  {
    id: 'sleeping-dress',
    name: 'Sleeping Dress',
    level: 1,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200&h=200&fit=crop',
    riddleClue: 'Where dreams are woven and moonlight glows, beneath the pillow where comfort flows. A place for rest when day is through, this cozy gift is waiting for you.',
    answer: 'bedroom',
    houseLocation: 'In the bedroom closet, top drawer',
  },
  {
    id: 'prayer-robe',
    name: 'Prayer Robe',
    level: 2,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200&h=200&fit=crop',
    riddleClue: 'In a sacred space where you find peace, where whispered prayers never cease. A place of calm, serene and bright, your special gift awaits in sight.',
    answer: 'prayer room',
    houseLocation: 'In the prayer room, folded on the mat',
  },
  {
    id: 'parfume',
    name: 'Parfume',
    level: 3,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop',
    riddleClue: 'Where beauty meets reflection\'s glow, and morning routines softly flow. Among the brushes, creams so fine, a fragrant treasure you will find.',
    answer: 'vanity',
    houseLocation: 'On your vanity table, behind the mirror',
  },
  {
    id: 'shoes',
    name: 'Shoes',
    level: 4,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop',
    riddleClue: 'Where every journey starts and ends, where soles and heels make lifelong friends. The first thing seen when entering through, your stepping gift awaits for you.',
    answer: 'shoe rack',
    houseLocation: 'On the shoe rack by the entrance door',
  },
  {
    id: 'bag',
    name: 'Bag',
    level: 5,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop',
    riddleClue: 'High above where dresses hang, in a space that\'s known to both our gang. Where special things are stored with care, reach up high - your treasure\'s there!',
    answer: 'closet',
    houseLocation: 'In the main closet, on the top shelf',
  },
];

// Bonus gift (optional)
export const bonusGift: Gift = {
  id: 'bouquet',
  name: 'Bouquet of Flowers',
  level: 0,
  image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop',
  riddleClue: 'A surprise bonus awaits! Look where meals are made with love...',
  answer: 'kitchen',
  houseLocation: 'In the kitchen, on the counter',
};
