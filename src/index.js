import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import App from './unmarc'


// This endpoint sets CSRF cookie in the browser
fetch('/_h/', { method: 'HEAD' })
// Without this call, all GraphQL queries will fail


ReactDOM.render(<App/>, document.getElementById('root'));
