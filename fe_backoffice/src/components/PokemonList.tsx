import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../features/pokemon/pokemonSlice';
import type { RootState, AppDispatch } from '../store';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.pokemon);
  const [offset, setOffset] = useState(0);
  const [pag, setPag] = useState(1); // Declara que la página empieza en 1
  const limit = 20;

  useEffect(() => {
    dispatch(fetchPokemon({ limit, offset }));
  }, [dispatch, offset]);

  const siguienteLista = () => {
    setOffset(prev => prev + limit); 
    setPag(prev => prev + 1); //Setea a la pagina siguiente
  };

  const regresarLista = () => {
    setOffset(prev => Math.max(prev - limit, 0)); 
    setPag(prev => Math.max(prev - 1, 1)); //Setea a la pagina previa
  };

  const irPrimeraPagina = () => {
    setPag(1);      //Resetea a la página 1
    setOffset(0);   //Resetea el offset al inicio
  };

const saltarCincoPaginas = () => {
  setOffset(prev => prev + (limit * 5));
  setPag(prev => prev + 5); //Setea la página desde la actual a 
};

const regresarCincoPaginas = () => {
  setOffset(prev => Math.max(prev - (limit * 5), 0));
  setPag(prev => Math.max(prev - 5, 1));
};

  return (
    <div className="pokemon-container">
      <h1>Pokédex</h1>

      {status === 'loading' && <p>Cargando Pokémon...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <ul className="pokemon-list">
            {data.map(poke => (
              <li key={poke.id} className="pokemon-card">
                <h3>{poke.name}</h3>
                <img src={poke.sprites.front_default} alt={poke.name} />
                <p>Tipo: {poke.types.map(t => t.type.name).join(', ')}</p>
                <p>Habilidades: {poke.abilities.map(a => a.ability.name).join(', ')}</p>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button onClick={irPrimeraPagina} disabled={pag === 1}>Min</button>
            <button onClick={regresarCincoPaginas} disabled={pag <= 5}>⪻</button>
            <button onClick={regresarLista} disabled={pag === 1}>Anterior</button>

            <p>Página {pag}</p>

            <button onClick={siguienteLista} disabled={data.length < limit}>Siguiente</button>
            <button onClick={saltarCincoPaginas} disabled={data.length < limit}>⪼</button>

          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
