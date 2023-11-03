import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { PiDotsThree } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Image } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

import { images } from '../../constants';
import { PokemonContext } from '../../contexts/pokemons-context';
import { PokemonSchema } from '../../utils/validationSchema';
import './Pokemons.scss';

// This interface represents an object type for form (formik) values
type InitialValue = { pokemon: string };

// Variable initialization for form (formik) values
const initialValue: InitialValue = { pokemon: '' };

/**
 * This is a React Functional Component (RFC) **
 * This component represents the types of pokemon ('/pokemon-type/:typeId') **
 * This component has no props **
 ***/

const Pokemons: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hidden, setHidden] = useState<boolean>(true);

  // Accessing React Context via the useContext react hook
  const { fetchPokemons, findPokemon, pokemons } = useContext(PokemonContext);
  const { clearPokemons } = useContext(PokemonContext);

  const navigate = useNavigate(); // For accessing router navigation
  const { typeId } = useParams(); // For accessing params

  /**
   * Fetching data (pokemons) onMount **
   * by triggering fetchPokemons() in the context when component is added to DOM tree **
   ***/

  useEffect(() => {
    fetchPokemons(typeId!);
  }, [fetchPokemons, typeId]);

  const perPage = 25; // total number of items per page

  // Updating totalPages state on mount
  useEffect(() => {
    pokemons && setTotalPages(Math.ceil(pokemons.length / perPage));
  }, [pokemons]);

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const subset = pokemons && pokemons.slice(startIndex, endIndex);

  // prettier-ignore
  // Function for handling page change (by updating currentPage state)
  const handlePageChange = (page: { selected: number }) => setCurrentPage(page.selected);

  // prettier-ignore
  // Function for handling form submit
  const handleSubmit = useCallback((name: string) => {
    findPokemon(name);
    setHidden(false);
  }, [findPokemon]);

  // prettier-ignore
  // Function for handling router navigation (pokemon-type page)
  const handleClick = (name: string) => navigate(`/pokemon-type/${typeId}/${name}`);

  // Function for handling router navigation (homepage)
  const handleGoBack = () => {
    clearPokemons();
    navigate('/');
  };

  // Function for resetting state
  const handleReset = () => {
    fetchPokemons(typeId!);
    setHidden(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="app__pokemon-type"
        className="app__pokemon-type"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
      >
        <div className="header app__flex">
          <Image src={images.logo} alt="logo" />
          <h1 className="head-text">{typeId!} Type</h1>
        </div>

        <div className="description app__flex">
          <p className="p-text">
            Search for a particular Pokémon below by name
          </p>
          {!hidden && (
            <p className="p-text reset" onClick={handleReset}>
              Click to reset
            </p>
          )}
        </div>

        <div className="pokemon-form app__flex">
          <Formik
            initialValues={initialValue}
            validationSchema={PokemonSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);

              handleSubmit(values.pokemon.toLowerCase());
              actions.setSubmitting(false);
              actions.resetForm();
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <AiFillHome className="home" onClick={handleGoBack} />

                <Field
                  type="text"
                  name="pokemon"
                  placeholder="Enter a pokemon name"
                />

                <Button
                  variant="solid"
                  type="submit"
                  size="md"
                  isDisabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                  loadingText="Submitting ..."
                >
                  Search
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="pokemons app__flex">
          {subset &&
            subset.map((pokemon, index) => (
              <motion.div
                key={`${pokemon.pokemon.name}-${index}`}
                className="pokemon app__flex"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                onClick={handleClick.bind(this, pokemon.pokemon.name)}
              >
                <p className="p-text">{pokemon.pokemon.name}</p>
              </motion.div>
            ))}
          {!pokemons && (
            <p className="bold-text not-found">We could't find a pokemon</p>
          )}
        </div>

        {pokemons && pokemons.length > 0 && (
          <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            previousLabel={<MdKeyboardArrowLeft />}
            nextLabel={<MdKeyboardArrowRight />}
            breakLabel={<PiDotsThree />}
            containerClassName="pagination-container"
            activeClassName="active-page"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Pokemons;
