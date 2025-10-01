import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PokemonDisplay from './components/PokemonDisplay'
import PokemonThunkDisplay from './components/PokemonThunkDisplay'
import React from 'react';
import PokemonList from './components/PokemonList';

function App() {
  

  return (
    <div className="App">
      <PokemonList />
    </div>
  );
}

export default App
