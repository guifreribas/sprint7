import { StarShip } from '../models/interfaces';

export function extractIndexFromStarship(starship: StarShip): string | null {
  const extractIdFromUrl = new RegExp(/\d+(?=\/$)/);
  const match = starship.url.match(extractIdFromUrl);
  return match ? match[0] : null;
}

export function extractIndexFromUrl(url: string): string | null {
  const extractIdFromUrl = new RegExp(/\d+(?=\/$)/);
  const match = url.match(extractIdFromUrl);
  return match ? match[0] : null;
}
