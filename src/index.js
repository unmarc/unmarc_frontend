import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import './index.css'
import App from './unmarc'
import { httpLink, csrfHeaderLink, authLink } from './common/apolloLinks'


// This endpoint sets CSRF cookie in the browser
fetch('/_h', { method: 'HEAD' })
// Without this call, all GraphQL queries will fail


const client = new ApolloClient({
  link: from([csrfHeaderLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={ client }>
      <App/>
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
);
