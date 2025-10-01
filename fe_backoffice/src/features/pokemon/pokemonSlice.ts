import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {Pokemon} from '../../types/pokemon'

export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async ({ limit, offset }: { limit: number; offset: number }) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();

        const detailedResults = await Promise.all(
            data.results.map(async (poke: { url: string }) => {
                const res = await fetch(poke.url);
                return await res.json(); // Esto devuelve todos los datos del Pokémon
            })
        );

        return detailedResults;
    }
);

//Interfaz del estado
interface PokemonState{
    data: Pokemon[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

//Estado inicial usando esa interfaz
const initialState: PokemonState ={
    data: [],
    status: 'idle',
    error: null,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPokemon.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchPokemon.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.data = action.payload; //reemplaza con los siguientes pokemon
        })
        .addCase(fetchPokemon.rejected, (state, action) =>{
            state.status = 'failed';
            state.error = action.error.message ?? 'Error desconocido';
        })
    },
});

export default pokemonSlice.reducer;