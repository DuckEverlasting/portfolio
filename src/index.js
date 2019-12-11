import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MobileApp from './MobileApp';

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

ReactDOM.render(
  <>
    {isMobileDevice() ? <MobileApp /> : <App />}
  </>, document.getElementById('root')
);
