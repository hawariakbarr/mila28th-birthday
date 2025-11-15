import { Gift } from '@/types';

export const gifts: Gift[] = [
  {
    id: 'sleeping-dress',
    name: 'Sleeping Dress',
    level: 1,
    image: '/images/gifts/sleeping-dress.png',
    isCollected: false,
    riddleClue: 'Where dreams are woven and moonlight glows, beneath the pillow where comfort flows. A place for rest when day is through, this cozy gift is waiting for you.',
    answer: 'bedroom',
    houseLocation: 'In the bedroom closet, top drawer',
  },
  {
    id: 'prayer-robe',
    name: 'Prayer Robe',
    level: 2,
    image: '/images/gifts/prayer-robe.png',
    isCollected: false,
    riddleClue: 'In a sacred space where you find peace, where whispered prayers never cease. A place of calm, serene and bright, your special gift awaits in sight.',
    answer: 'prayer room',
    houseLocation: 'In the prayer room, folded on the mat',
  },
  {
    id: 'parfume',
    name: 'Parfume',
    level: 3,
    image: '/images/gifts/parfume.png',
    isCollected: false,
    riddleClue: 'Where beauty meets reflection\'s glow, and morning routines softly flow. Among the brushes, creams so fine, a fragrant treasure you will find.',
    answer: 'vanity',
    houseLocation: 'On your vanity table, behind the mirror',
  },
  {
    id: 'shoes',
    name: 'Shoes',
    level: 4,
    image: '/images/gifts/shoes.png',
    isCollected: false,
    riddleClue: 'Where every journey starts and ends, where soles and heels make lifelong friends. The first thing seen when entering through, your stepping gift awaits for you.',
    answer: 'shoe rack',
    houseLocation: 'On the shoe rack by the entrance door',
  },
  {
    id: 'bag',
    name: 'Bag',
    level: 5,
    image: '/images/gifts/bag.png',
    isCollected: false,
    riddleClue: 'High above where dresses hang, in a space that\'s known to both our gang. Where special things are stored with care, reach up high - your treasure\'s there!',
    answer: 'closet',
    houseLocation: 'In the main closet, on the top shelf',
  },
];

// You can add a bonus gift later
export const bonusGift: Gift = {
  id: 'bouquet',
  name: 'Bouquet of Flowers',
  level: 0,
  image: '/images/gifts/bouquet.png',
  isCollected: false,
  riddleClue: 'A surprise bonus awaits! Look where meals are made with love...',
  answer: 'kitchen',
  houseLocation: 'In the kitchen, on the counter',
};
