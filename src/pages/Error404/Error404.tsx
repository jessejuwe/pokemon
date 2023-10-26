import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, VStack } from '@chakra-ui/react';

import { Skeleton } from '../../exports/exports';
import './Error404.scss';

/**
 * This is a React Functional Component (RFC) **
 * This component represents the error page ('*') **
 * This component has no props **
 ***/

const Error404: React.FC = () => {
  const navigate = useNavigate();

  // Function for handling router navigation
  const handleNavigate = () => navigate('/');

  return (
    <motion.div
      className="app__error app__flex"
      key="app__error"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        delayChildren: 0.5,
      }}
    >
      <div className="error">
        <VStack align="center" width="full" spacing="4">
          <Skeleton />
          <h3 className="head-text">Page not found</h3>
          <p className="p-text">Oops, this page does not exist</p>
          <Button bg="primary" onClick={handleNavigate}>
            Back to homepage
          </Button>
        </VStack>
      </div>
    </motion.div>
  );
};

export default Error404;
