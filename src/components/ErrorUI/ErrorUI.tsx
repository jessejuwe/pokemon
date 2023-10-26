import { motion } from 'framer-motion';
import { Button, VStack, Skeleton } from '@chakra-ui/react';

import './ErrorUI.scss';

type Props = { error: { message: string }; resetErrorBoundary: () => void };

const ErrorUI: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <motion.div
      className="app__error-ui app__flex"
      key="app__error-ui"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        delayChildren: 0.5,
      }}
    >
      <div className="error">
        <VStack align="center" width="full" spacing="4" px={6}>
          <Skeleton
            height="20px"
            width="full"
            startColor="pink.500"
            endColor="orange.500"
          />
          <Skeleton
            height="20px"
            width="full"
            startColor="pink.500"
            endColor="orange.500"
          />

          <h3>We caught an error</h3>
          <pre className="p-text">{error.message}</pre>
          <Button onClick={resetErrorBoundary} size="md">
            Reload
          </Button>
        </VStack>
      </div>
    </motion.div>
  );
};

export default ErrorUI;
