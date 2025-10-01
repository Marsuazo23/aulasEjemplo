// src/components/PokemonDisplay.tsx
import React from 'react'
import { useGetPokemonListQuery} from '../services/pokemonApi'

const PokemonDisplay: React.FC = () => {
  // Obtener lista de Pokemon
  const { 
    data: pokemonList, 
  } = useGetPokemonListQuery({ limit: 1302, offset: 0 })
  const pokemonDataJson = JSON.stringify(pokemonList, null, 2);



  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>PokéApi</h1>

      <section>
        <h2>Lista de Pokemon:</h2>
        <pre>
         {pokemonDataJson}
        </pre>
      </section>

    

    </div>
  )
}

export default PokemonDisplay