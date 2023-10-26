// export type PokemonType = {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Results[];
// };

export type PokemonType = { name: string; url: string };

interface Abilities {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

interface Forms {
  name: string;
  url: string;
}

interface Moves {
  move: { name: string; url: string };
  version_group_details: any[];
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

interface Types {
  slot: number;
  type: { name: string; url: string };
}

interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: {
    dream_world: { front_default: string; front_female: string | null };
    home: {
      front_default: string;
      front_female: string | null;
      front_shiny: string;
      front_shiny_female: null;
    };
    'official-artwork': { front_default: string; front_shiny: string };
  };
  versions: any;
}

export type PokemonDetail = {
  abilities: Abilities[];
  base_experience: number;
  forms: Forms[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: { name: string; url: string };
  sprites: Sprites;
  stats: Stats[];
  types: Types[];
  weight: number;
};

export interface Pokemon {
  pokemon: { name: string; url?: string };
  slot?: number;
}

export type Pokemons = {
  damage_relations: any;
  game_indices: any[];
  generation: any;
  id: number;
  move_damage_class: any;
  moves: any[];
  name: string;
  names: any[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
};
