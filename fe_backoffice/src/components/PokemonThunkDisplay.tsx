import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../features/pokemon/pokemonSlice';
import type { RootState, AppDispatch } from '../store';

const PokemonThunkDisplay: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.pokemon);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    dispatch(fetchPokemon({ limit, offset }));
  }, [dispatch, offset]);

  const siguienteLista = () => {
    setOffset((prev) => prev + limit);
  };

  const regresarLista = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Pokémon con createAsyncThunk</h1>

      {status === 'loading' && <p>Cargando datos...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <ul>
            {data.map((poke: any) => (
              <li key={poke.id}>
                <strong>{poke.name}</strong> (ID: {poke.id})<br />
                <img src={poke.sprites.front_default} alt={poke.name} width={80} /><br />
                Tipo: {poke.types.map((t: any) => t.type.name).join(', ')}<br />
                Habilidades: {poke.abilities.map((a: any) => a.ability.name).join(', ')}
                <hr />
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={regresarLista} disabled={offset === 0}>Regresar</button>
            <button onClick={siguienteLista}>Siguiente lista</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonThunkDisplay;