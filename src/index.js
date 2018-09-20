// punto de entrada deL WEBPACK
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// rednderiza el componente App 
//id del index.html
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();