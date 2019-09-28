import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from "apollo-link-context"
import { InMemoryCache } from 'apollo-cache-inmemory'
import Cookies from 'js-cookie'
import { Provider } from 'react-redux'

import './index.css'
import { store } from './unmarc/store'
import App from './unmarc'


fetch('/_h', { method: 'HEAD' })

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-CSRFToken": Cookies.get('csrftoken'),
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={ client }>
        <App/>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
