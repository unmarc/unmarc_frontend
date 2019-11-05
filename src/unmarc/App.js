import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'
import isNil from 'lodash.isnil'

import { httpLink, csrfHeaderLink, createErrorLink } from '../common/apolloLinks'
import Login from '../auth/Login'
import { AuthContext } from '../auth'
import { Routes } from './routes'
import { useAuth } from './hooks'


let apolloClient = null;

function initApolloClient(on403Error) {
    apolloClient = new ApolloClient({
        link: from([
            csrfHeaderLink,
            createErrorLink(on403Error),
            httpLink
        ]),
        cache: new InMemoryCache(),
    })
}

function App() {
    const { authState, userInfo, setIsLoggedIn, logout, resetUserSession } = useAuth(apolloClient)

    if (isNil(apolloClient)) initApolloClient(resetUserSession)

    if (authState.isInitializing) {
        if (authState.networkError)
            return <h2>Could not connect to server</h2>
        return <h2>Starting...</h2>
    }

    return (
      authState.isLoggedIn ?
        <AuthContext.Provider value={ { userInfo, logout } }>
            <ApolloProvider client={ apolloClient }>
                <Routes/>
            </ApolloProvider>
        </AuthContext.Provider>
        :
        <Login onSuccess={ () => setIsLoggedIn(true) }/>
    )
}

export default App
