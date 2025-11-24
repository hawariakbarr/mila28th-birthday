/**
 * Shared game logic utilities
 * Used across all game components to avoid duplication
 */

export interface Coordinate {
  x: number;
  y: number;
}

export interface ClickableItem extends Coordinate {
  id: string;
  radius: number;
}

/**
 * Calculate distance between two points (Euclidean distance)
 */
export function calculateDistance(
  point1: Coordinate,
  point2: Coordinate
): number {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
}

/**
 * Detect collision between a click point and target item
 * Used by: HiddenObjects, SpotTheDifference
 */
export function detectCollision(
  clickPoint: Coordinate,
  target: ClickableItem
): boolean {
  const distance = calculateDistance(clickPoint, target);
  return distance <= target.radius;
}

/**
 * Convert mouse click event to percentage-based coordinates
 * Returns coordinates as % (0-100) for responsive design
 */
export function getRelativeCoordinates(
  event: React.MouseEvent<HTMLDivElement>
): Coordinate {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  return { x, y };
}

/**
 * Find clicked item from a list of items
 * Returns the first item within radius of click point
 */
export function findClickedItem(
  clickPoint: Coordinate,
  items: ClickableItem[],
  excludedIds: string[] = []
): ClickableItem | undefined {
  return items.find((item) => {
    if (excludedIds.includes(item.id)) return false;
    return detectCollision(clickPoint, item);
  });
}

/**
 * Check if all required items have been found
 * Used for win condition checking
 */
export function checkWinCondition(
  foundItems: string[],
  requiredItems: string[]
): boolean {
  return requiredItems.every((id) => foundItems.includes(id));
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * Used by: MemoryMatch
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate unique ID (simple implementation)
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
