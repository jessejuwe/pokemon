import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Fallback } from './exports/exports';

/**
 * Lazy loading components **
 * De-clutters the DOM by adding components only after it has fully parsed **
 ***/

const Details = lazy(() => import('./pages/Details/Details'));
const Error404 = lazy(() => import('./pages/Error404/Error404'));
const Home = lazy(() => import('./pages/Home/Home'));
const Pokemons = lazy(() => import('./pages/Pokemons/Pokemons'));

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-type/:typeId/:pokemonId" element={<Details />} />
        <Route path="/pokemon-type/:typeId" element={<Pokemons />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;
