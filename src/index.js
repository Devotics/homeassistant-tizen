import 'babel-polyfill';
import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './index.scss';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
