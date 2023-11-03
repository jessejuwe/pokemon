import { Skeleton } from '@chakra-ui/react';
import React from 'react';

const SkeletonComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <Skeleton startColor="pink.500" endColor="orange.500" height="20px" />
      <Skeleton startColor="pink.500" endColor="orange.500" height="20px" />
      <Skeleton startColor="pink.500" endColor="orange.500" height="20px" />
    </div>
  );
};

export default SkeletonComponent;
