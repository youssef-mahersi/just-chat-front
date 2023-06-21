import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Authenticate from './pages/Authenticate';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = document.getElementById('root');
render(
  <Provider store={store}>
    <React.StrictMode>
      <>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a  className="flex items-center">
              <img src="https://i.ibb.co/BPvdFzP/logo.png" className="h-8 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Just Chat</span>
            </a>
          </div>
        </nav>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authenticate />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </>
    </React.StrictMode>
  </Provider>,
  root
);

reportWebVitals(console.log);
