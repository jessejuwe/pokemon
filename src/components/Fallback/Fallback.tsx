import { useCallback, useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

import './Fallback.scss';

const Fallback: React.FC = () => {
  const [width, setWidth] = useState<number | null>(null);

  const widthHandler = useCallback(() => setWidth(window.innerWidth), []);

  useEffect(() => {
    widthHandler();
  }, [widthHandler]);

  return (
    <div
      className={`app__flex app__fallback ${
        width && width >= 768 ? 'app__bg' : ''
      }`}
    >
      <Spinner />
    </div>
  );
};

export default Fallback;
