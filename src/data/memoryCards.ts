// Birthday-themed emojis for memory match game
export const cardImages = [
  '🍬', // Candy
  '🎁', // Gift
  '🎈', // Balloon
  '🎉', // Party popper
  '🎊', // Confetti ball
  '🕯️', // Candle
  '🍰', // Cake slice
  '🎀', // Ribbon
];

// Generate pairs of cards
export function generateCards() {
  const pairs = cardImages.map((image, index) => [
    { id: index * 2, image, pairId: index },
    { id: index * 2 + 1, image, pairId: index },
  ]).flat();

  // Shuffle cards
  return pairs.sort(() => Math.random() - 0.5);
}
