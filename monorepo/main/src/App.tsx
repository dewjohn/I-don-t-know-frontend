import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WujieReact from 'wujie-react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <h1>这是主应用</h1>
      <WujieReact url='http://127.0.0.1:5175/' name='react'></WujieReact>
      <WujieReact url='http://127.0.0.1:5174/' name='vue'></WujieReact>
    </div>
  );
}

export default App;
