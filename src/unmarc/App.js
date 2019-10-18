import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'

import { staffHttpLink, csrfHeaderLink, createErrorLink } from '../common/apolloLinks'
import { AuthContext } from '../auth'
import { Routes } from './routes'
import Login from '../auth/Login'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if (!isLoggedIn)
    return <Login onSuccess={() => setIsLoggedIn(true)} />

  const state = {
    isLoggedIn,
    setIsLoggedIn
  }

  const client = new ApolloClient({
    link: from([
      csrfHeaderLink,
      createErrorLink(() => setIsLoggedIn(false)),
      staffHttpLink
    ]),
    cache: new InMemoryCache(),
  })

  return (
    <AuthContext.Provider value={ state }>
      <ApolloProvider client={ client }>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
