import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { 
  Pokemon, 
  PokemonListResponse, 
  PokemonSpecies 
} from '../types/pokemon'

// Función helper para extraer ID de la URL
const extractIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? parseInt(matches[1], 10) : 0
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  tagTypes: ['Pokemon', 'PokemonList', 'PokemonSpecies'],
  endpoints: (builder) => ({
    // Obtener lista de Pokemon con paginación
    getPokemonList: builder.query<PokemonListResponse, { limit?: number; offset?: number }>({
      query: ({ limit = 20, offset = 0 } = {}) => 
        `pokemon?limit=${limit}&offset=${offset}`,
      providesTags: (result, error, { limit, offset }) => [
        { type: 'PokemonList', id: `${limit}-${offset}` }
      ],
    }),

    // Obtener Pokemon por nombre o ID
    getPokemonByName: builder.query<Pokemon, string | number>({
      query: (nameOrId) => `pokemon/${nameOrId}`,
      providesTags: (result, error, nameOrId) => [
        { type: 'Pokemon', id: nameOrId }
      ],
      transformResponse: (response: Pokemon) => ({
        ...response,
        // Asegurar que las URLs de imágenes estén disponibles
        sprites: {
          ...response.sprites,
          front_default: response.sprites.front_default || 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.id}.png`
        }
      }),
    }),

    // Obtener múltiples Pokemon (útil para mostrar varios a la vez)
    getMultiplePokemon: builder.query<Pokemon[], (string | number)[]>({
      async queryFn(pokemonIds, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const results = await Promise.all(
            pokemonIds.map(async (id) => {
              const result = await fetchWithBQ(`pokemon/${id}`)
              return result.data as Pokemon
            })
          )
          return { data: results }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((pokemon) => ({ type: 'Pokemon' as const, id: pokemon.id })),
              { type: 'Pokemon', id: 'MULTIPLE' },
            ]
          : [{ type: 'Pokemon', id: 'MULTIPLE' }],
    }),

    // Obtener especies de Pokemon (para información adicional)
    getPokemonSpecies: builder.query<PokemonSpecies, string | number>({
      query: (nameOrId) => `pokemon-species/${nameOrId}`,
      providesTags: (result, error, nameOrId) => [
        { type: 'PokemonSpecies', id: nameOrId }
      ],
    }),

    // Buscar Pokemon por tipo
    getPokemonByType: builder.query<{ pokemon: { pokemon: { name: string; url: string } }[] }, string>({
      query: (typeName) => `type/${typeName}`,
    }),

    // Búsqueda de Pokemon con autocompletado
    searchPokemon: builder.query<Pokemon[], string>({
      async queryFn(searchTerm, _queryApi, _extraOptions, fetchWithBQ) {
        if (!searchTerm || searchTerm.length < 2) {
          return { data: [] }
        }

        try {
          // Primero intentar obtener por nombre exacto
          const exactMatch = await fetchWithBQ(`pokemon/${searchTerm.toLowerCase()}`)
          if (exactMatch.data) {
            return { data: [exactMatch.data as Pokemon] }
          }
        } catch {
          // Si no encuentra coincidencia exacta, buscar en la lista
        }

        try {
          // Buscar en la lista completa (esto es pesado, en producción usarías un endpoint de búsqueda)
          const listResult = await fetchWithBQ('pokemon?limit=1000')
          const pokemonList = listResult.data as PokemonListResponse
          
          const matches = pokemonList.results
            .filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()))
            .slice(0, 10) // Limitar a 10 resultados

          const pokemonDetails = await Promise.all(
            matches.map(async (pokemon) => {
              const result = await fetchWithBQ(`pokemon/${pokemon.name}`)
              return result.data as Pokemon
            })
          )

          return { data: pokemonDetails }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
    }),
  }),
})

export const {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useGetMultiplePokemonQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonByTypeQuery,
  useSearchPokemonQuery,
  useLazyGetPokemonByNameQuery,
  useLazySearchPokemonQuery,
} = pokemonApi