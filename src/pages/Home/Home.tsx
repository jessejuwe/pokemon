import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@chakra-ui/react';

import { images } from '../../constants';
import { PokemonContext } from '../../contexts/pokemons-context';
import './Home.scss';

/**
 * This is a React Functional Component (RFC) **
 * This component represents the homepage ('/') **
 * This component has no props **
 ***/

const Home: React.FC = () => {
  // Accessing React Context via the useContext react hook
  const { fetchTypes, types } = useContext(PokemonContext);

  const navigate = useNavigate(); // For accessing router navigation

  /**
   * Fetching data (pokemon types) onMount **
   * by triggering fetchTypes() in the context when component is added to DOM tree **
   ***/

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  // prettier-ignore
  const clickHandler = (name: string) => navigate(`/pokemon-type/${name}`);

  return (
    <AnimatePresence>
      <motion.div
        key="app__home"
        className="app__home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
      >
        <div className="logo app__flex">
          <Image src={images.logo} alt="logo" />
          <h1 className="head-text">Pokémon</h1>
        </div>

        <div className="description">
          <p className="p-text">
            This app allows you learn a lot about Pokémons
          </p>
          <p className="p-text">Click on a type to see more</p>
        </div>

        <div className="types app__flex">
          {types &&
            types.map((type, index) => (
              <motion.div
                key={index}
                className="type app__flex"
                whileInView={{ opacity: [0, 1] }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                onClick={clickHandler.bind(this, type.name)}
              >
                <p className="bold-text">{type.name}</p>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
