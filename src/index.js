import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MobileApp from './MobileApp';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

ReactDOM.render(
  <>
    {isMobileDevice() ? <MobileApp /> : <App />}
  </>, document.getElementById('root')
);
