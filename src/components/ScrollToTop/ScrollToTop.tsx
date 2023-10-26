import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);

    return () => {};
  }, [pathname]);
  return null;
};

export default ScrollToTop;
