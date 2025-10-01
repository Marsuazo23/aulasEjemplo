// Tipos base de Pokemon
export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: PokemonSprites
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  species: NamedAPIResource
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  front_female: string | null
  front_shiny_female: string | null
  back_default: string | null
  back_shiny: string | null
  back_female: string | null
  back_shiny_female: string | null
  other: {
    dream_world: {
      front_default: string | null
      front_female: string | null
    }
    home: {
      front_default: string | null
      front_female: string | null
      front_shiny: string | null
      front_shiny_female: string | null
    }
    'official-artwork': {
      front_default: string | null
      front_shiny: string | null
    }
  }
}

export interface PokemonType {
  slot: number
  type: NamedAPIResource
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: NamedAPIResource
}

export interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export interface NamedAPIResource {
  name: string
  url: string
}

// Lista de Pokemon
export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

// Pokemon Species
export interface PokemonSpecies {
  id: number
  name: string
  order: number
  gender_rate: number
  capture_rate: number
  base_happiness: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  hatch_counter: number
  has_gender_differences: boolean
  forms_switchable: boolean
  growth_rate: NamedAPIResource
  pokedex_numbers: PokemonSpeciesDexEntry[]
  egg_groups: NamedAPIResource[]
  color: NamedAPIResource
  shape: NamedAPIResource
  evolves_from_species: NamedAPIResource | null
  evolution_chain: {
    url: string
  }
  habitat: NamedAPIResource | null
  generation: NamedAPIResource
  names: Name[]
  flavor_text_entries: FlavorTextEntry[]
  form_descriptions: Description[]
  genera: Genus[]
  varieties: PokemonSpeciesVariety[]
}

export interface PokemonSpeciesDexEntry {
  entry_number: number
  pokedex: NamedAPIResource
}

export interface Name {
  name: string
  language: NamedAPIResource
}

export interface FlavorTextEntry {
  flavor_text: string
  language: NamedAPIResource
  version: NamedAPIResource
}

export interface Description {
  description: string
  language: NamedAPIResource
}

export interface Genus {
  genus: string
  language: NamedAPIResource
}

export interface PokemonSpeciesVariety {
  is_default: boolean
  pokemon: NamedAPIResource
}

// Types para componentes
export interface PokemonCardProps {
  pokemon: Pokemon
}

export interface PokemonListProps {
  limit?: number
  offset?: number
}
