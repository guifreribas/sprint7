export interface StarShipResponse {
  count: number;
  next: string;
  previous: any;
  results: StarShip[];
}

export interface StarShip {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: any[];
  films: string[];
  created: string;
  edited: string;
  url: string;
  imgUrl?: string;
  index?: string;
}

export interface ResponseHandle {
  success: any | null;
  error: any | null;
}
