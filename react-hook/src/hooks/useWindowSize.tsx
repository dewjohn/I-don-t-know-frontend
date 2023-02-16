import { useEffect, useState } from 'react';

const getSise = () => {
  return window.innerWidth > 1000 ? 'large' : 'small';
};

const useWindowSize = () => {
  const [size, setSize] = useState(getSise());
  useEffect(() => {
    const hander = () => {
      setSize(getSise());
    };
    window.addEventListener('resize', hander);
    return () => {
      window.removeEventListener('resize', hander);
    };
  }, []);
  return size;
};

export default useWindowSize;
