import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './unmarc'
import { isDevEnv } from './common/constants'


ReactDOM.render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>
  , document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production' || !isDevEnv) require('whatwg-fetch')
