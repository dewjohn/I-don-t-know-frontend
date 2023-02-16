import { useEffect, useState } from 'react';

function getPosition() {
  return {
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop,
  };
}

const useScroll = () => {
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    console.log('position', position);
    const handler = () => setPosition(getPosition());
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);
  return [position.x, position.y];
};

export default useScroll;
