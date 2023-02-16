import React, { useCallback, useState } from 'react';

const useCounter = () => {
  const [count, setCount] = useState(0);
  const increase = useCallback(() => setCount((pre) => pre + 1), []);
  const decrease = useCallback(() => setCount((pre) => pre - 1), []);
  const reset = useCallback(() => setCount(0), []);
  return { count, increase, decrease, reset };
};

export default useCounter;
