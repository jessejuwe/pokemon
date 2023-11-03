import React, { useCallback, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import api from '../helpers/axios';
import { Pokemon, PokemonDetail, PokemonType } from '../types/Pokemon';

type Props = { children: React.ReactNode };

// This interface represents an object type for the react context
interface PokemonContextObj {
  types: PokemonType[] | null;
  detail: PokemonDetail | null;
  pokemons: Pokemon[] | null;
  clearDetail: () => void;
  clearPokemons: () => void;
  fetchDetail: (name: string) => void;
  fetchPokemons: (name: string) => void;
  fetchTypes: () => void;
  findPokemon: (name: string) => void;
}

/**
 * This is a React Context **
 * This component represents the 'pokemon' context for app-wide state management **
 ***/

export const PokemonContext = React.createContext<PokemonContextObj>({
  types: null,
  detail: null,
  pokemons: null,
  clearDetail: () => {},
  clearPokemons: () => {},
  fetchDetail: (name: string) => {},
  fetchPokemons: (name: string) => {},
  fetchTypes: () => {},
  findPokemon: (name: string) => {},
});

/**
 * This is a React Functional Component (RFC) **
 * This component takes only one prop named 'children' **
 * This component represents the context provider **
 * This component allows components it wraps access the context **
 ***/

const PokemonContextProvider: React.FC<Props> = props => {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [types, setTypes] = useState<PokemonType[] | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

  const { showBoundary } = useErrorBoundary();

  // Function for fetching data (types of pokemon)
  const fetchTypes = useCallback(async () => {
    try {
      // prettier-ignore
      const response = await api.get('/type');

      if (!response) throw Error('No response from server.');

      const data: PokemonType[] = response.data.results;

      setTypes(data);
    } catch (error: any) {
      showBoundary(error); // Catches errors thrown in error boundary
    }
  }, [showBoundary]);

  // Function for fetching data (pokemon detail)
  const fetchDetail = useCallback(
    async (name: string) => {
      setDetail(null);

      try {
        const response = await api.get(`/pokemon/${name}`);

        if (!response) throw Error('No response from server.');

        const data: PokemonDetail = response.data;

        setDetail(data);
      } catch (error: any) {
        showBoundary(error); // Catches errors thrown in error boundary
      }
    },
    [showBoundary]
  );

  // Function for fetching data (pokemons belonging to a type)
  const fetchPokemons = useCallback(
    async (name: string) => {
      try {
        const response = await api.get(`/type/${name}`);

        if (!response) throw Error('No response from server.');

        const data: Pokemon[] = response.data.pokemon;

        setPokemons(data);
      } catch (error: any) {
        showBoundary(error); // Catches errors thrown in error boundary
      }
    },
    [showBoundary]
  );

  // Function for fetching data (a single pokemon)
  const findPokemon = useCallback(async (name: string) => {
    try {
      const response = await api.get(`/pokemon/${name}`);

      if (!response) throw Error('No response from server.');

      const data: PokemonDetail = response.data;

      const transformed: Pokemon[] = [];

      const foundPokemon: Pokemon = { pokemon: { name: data.name } };

      transformed.push(foundPokemon);

      setPokemons(transformed);
    } catch (error: any) {
      setPokemons(null);
    }
  }, []);

  // Function for resetting detail state
  const clearDetail = () => setDetail(null);

  // Function for resetting pokemons state
  const clearPokemons = () => setPokemons(null);

  // Object being into passed into context provider
  const contextValue: PokemonContextObj = {
    types,
    detail,
    pokemons,
    clearDetail,
    fetchDetail,
    fetchPokemons,
    fetchTypes,
    findPokemon,
    clearPokemons,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonContextProvider;
