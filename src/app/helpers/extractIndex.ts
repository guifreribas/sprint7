import { StarShip } from '../models/interfaces';

export function extractIndexFromUrl(starship: StarShip): string | null {
  const extractIdFromUrl = new RegExp(/\d+(?=\/$)/);
  const match = starship.url.match(extractIdFromUrl);
  return match ? match[0] : null;
}
