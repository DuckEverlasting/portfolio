import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import MobileApp from './MobileApp';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

ReactDOM.render(
  <BrowserRouter>
    {isMobileDevice() ? <MobileApp /> : <App />}
  </BrowserRouter>, document.getElementById('root')
);
