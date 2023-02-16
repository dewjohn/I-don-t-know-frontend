import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Mobx from './component/tutorial';
import './index.css';
import store from './component/tutorial/store/tutorial';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Mobx store={store} />
  </React.StrictMode>
);
