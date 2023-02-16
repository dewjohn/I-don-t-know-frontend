import { useState } from 'react';
import Theme from './components/theme';
import Timer from './components/timer';
import UseEffect from './components/useEffect';
import useCounter from './hooks/useCounter';
import useScroll from './hooks/useScroll';
import useWindowSize from './hooks/useWindowSize';

interface Icount {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

function App() {
  const size = useWindowSize();
  const { count, increase, decrease, reset } = useCounter();
  const [x, y] = useScroll();
  // console.log(size);
  console.log(y);
  return (
    <div
      className='App'
      style={{
        height: '200vh',
      }}
    >
      <Timer />
      <Theme />
      <UseEffect />
      <div>
        <p>{count}</p>
        <button onClick={decrease}>-</button>
        <button onClick={increase}>+</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}

export default App;
