import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';

import PokemonContextProvider from './contexts/pokemons-context';
import { ErrorUI } from './exports/exports';

const colors = { primary: '#CF5D1E', secondary: '#203C38' };

const fonts = {
  body: `'Lato', sans-serif`,
  heading: `'Lato', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorUI}>
      <ChakraProvider theme={theme}>
        <PokemonContextProvider>{children}</PokemonContextProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
