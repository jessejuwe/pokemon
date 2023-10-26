import React from 'react';
import { Spinner } from '@chakra-ui/react';

const SpinnerComponent: React.FC = () => {
  return (
    <div className="app__flex w-full">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
};

export default SpinnerComponent;
