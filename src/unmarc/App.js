import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'
import gql from 'graphql-tag'
import isNil from 'lodash.isnil'
import isEmpty from 'lodash.isempty'

import { staffHttpLink, csrfHeaderLink, createErrorLink } from '../common/apolloLinks'
import Login from '../auth/Login'
import { AuthContext } from '../auth'
import { Routes } from './routes'
import { useAuthState } from './hooks'


let apolloClient = null;

function initApolloClient(onErrorCb) {
  apolloClient = new ApolloClient({
    link: from([
      csrfHeaderLink,
      createErrorLink(onErrorCb),
      staffHttpLink
    ]),
    cache: new InMemoryCache(),
  })
}

function App() {
  const [
    isLoggedIn, userInfo,
    setIsLoggedIn, setUserInfo,
    logout, resetAuthState
  ] = useAuthState()

  if (isNil(apolloClient)) {
    initApolloClient(() => resetAuthState())
  }

  useEffect(() => {
    if (isEmpty(userInfo) && isLoggedIn) {
      apolloClient.query({
        // this query will fail if user is not logged in
        // and isLoggedIn will become `false` because of errorLink
        query: gql`
          query {
            me {
              username
              name
            }
          }
        `
      })
      .then(({ data }) => setUserInfo(data.me))
      .catch(e => {})
    }
  })

  if (!isLoggedIn)
    return <Login onSuccess={ () => setIsLoggedIn(true) }/>

  return (
    <AuthContext.Provider value={ { userInfo, logout } }>
      <ApolloProvider client={ apolloClient }>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
