import React, { useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'
import gql from 'graphql-tag'
import isEmpty from 'lodash.isempty'

import { staffHttpLink, csrfHeaderLink, createErrorLink } from '../common/apolloLinks'
import Login from '../auth/Login'
import authService from '../auth/authService'
import { AuthContext } from '../auth'
import { Routes } from './routes'


const USERPROFILE_QUERY = gql`
  query {
    me {
      username
      name
    }
  }
`

function App() {
  /* set to `true` by default. We don't know if previous session exists
   * because httponly cookie. If not logged in, fail when fetching user info
   */
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const [userInfo, setUserInfo] = useState({})

  if (!isLoggedIn)
    // will arrive here only if isLoggedIn becomes `false`
    // when fetching user info or for some reason later
    return <Login onSuccess={ () => setIsLoggedIn(true) }/>

  const authState = {
    userInfo,
    logout: () => {
      setIsLoggedIn(false)
      authService.logout()
      setUserInfo({})
    }
  }

  const client = new ApolloClient({
    link: from([
      csrfHeaderLink,
      createErrorLink(() => authState.logout()),
      staffHttpLink
    ]),
    cache: new InMemoryCache(),
  })

  if (isEmpty(userInfo)) {
    client.query({
      // this query will fail if user is not logged in
      // and isLoggedIn will become `false` because of errorLink
      query: USERPROFILE_QUERY
    }).then(({ data }) => setUserInfo(data.me))
  }

  return (
    !isEmpty(userInfo) &&
      // thus we render the app only after
      // user info has been retrieved
      <AuthContext.Provider value={ authState }>
        <ApolloProvider client={ client }>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </ApolloProvider>
      </AuthContext.Provider>
  )
}

export default App
