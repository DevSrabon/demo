import React, { useEffect } from 'react';

const useWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return [width, setWidth];
};

export default useWidth;
