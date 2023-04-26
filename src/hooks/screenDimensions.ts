import { useEffect, useState } from 'react';

const useScreenDimensions = () => {
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setScreenDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return {
    ...screenDimensions,
  };
};

export { useScreenDimensions };
