import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Image } from '@chakra-ui/react';

import { images } from '../../constants';
import { PokemonContext } from '../../contexts/pokemons-context';
import './Details.scss';

/**
 * This is a React Functional Component (RFC) **
 * This component represents the pokemon detail ('/pokemon-type/:typeId/:pokemonId') **
 * This component has no props **
 ***/

const Details: React.FC = () => {
  // Accessing React Context via the useContext react hook
  const { clearDetail, detail, fetchDetail } = useContext(PokemonContext);

  const navigate = useNavigate(); // For accessing router navigation
  const { pokemonId, typeId } = useParams(); // For accessing params

  /**
   * Fetching data (pokemon detail) onMount **
   * by triggering fetchDetail() in the context when component is added to DOM tree **
   ***/

  useEffect(() => {
    fetchDetail(pokemonId!);
  }, [fetchDetail, pokemonId]);

  // prettier-ignore
  const imageUrl = detail && detail.sprites.other['official-artwork'].front_shiny;

  // Function for resetting state in context & handling router navigation
  const handleGoBack = () => {
    clearDetail();
    navigate(`/pokemon-type/${typeId}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="app__pokemon-details"
        className="app__pokemon-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
      >
        {detail && (
          <>
            <div className="header app__flex">
              <Image src={images.logo} alt="logo" />
              <h1 className="head-text">{pokemonId!} Species</h1>
            </div>

            <div className="info-body">
              <div className="image app__flex">
                <Image src={imageUrl || ''} alt="pokemon" />
              </div>

              <div className="info">
                <div className="stats">
                  <p className="big-text name">Name: {detail.name}</p>
                  <p className="big-text">Height: {detail.height} cm</p>
                  <p className="big-text">Weight: {detail.weight} lbs</p>
                  <p className="big-text">
                    Base Experience: {detail.base_experience} XP
                  </p>
                </div>

                <div className="details">
                  <div className="abilities">
                    <p className="big-text heading">Abilities</p>
                    <div className="ability">
                      {detail.abilities.map((ability, index) => (
                        <p key={index}>{ability.ability.name}</p>
                      ))}
                    </div>
                  </div>

                  <div className="abilities">
                    <p className="big-text heading">Moves</p>
                    <div className="ability">
                      {detail.moves.splice(1, 5).map((moves, index) => (
                        <p key={index}>{moves.move.name}</p>
                      ))}
                    </div>
                  </div>

                  <div className="abilities">
                    <p className="big-text heading">Types</p>
                    <div className="ability">
                      {detail.types.map((types, index) => (
                        <p key={index}>{types.type.name}</p>
                      ))}
                    </div>
                  </div>

                  <div className="abilities">
                    <p className="big-text heading">Base Stats</p>
                    <div className="ability">
                      {detail.stats.map((stats, index) => (
                        <p
                          key={index}
                        >{`${stats.stat.name}: ${stats.base_stat}`}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={handleGoBack} size="md" variant="outline">
                  Go back
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Details;
