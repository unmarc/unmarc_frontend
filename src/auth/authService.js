import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'
import gql from 'graphql-tag'
import { csrfHeaderLink, httpLink } from '../common/apolloLinks'
import { tokenRefreshDelta } from '../common/constants'


export const authContext = (function() {
  return {
    accessToken: undefined,
    refreshToken: undefined,

    setTokens(aToken, rToken) {
      this.accessToken = aToken
      this.refreshToken = rToken
    },

    get hasTokens() {
      return Boolean(this.accessToken) && Boolean(this.refreshToken)
    }
  }
})()

const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`

const REVOKE_TOKEN_MUTATION = gql`
  mutation RevokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`

class AuthService {
  constructor() {
    this.timerID = null
    this.authClient = new ApolloClient({
      link: from([csrfHeaderLink, httpLink]),
      cache: new InMemoryCache(),
    })
    this.clearTokens = this.clearTokens.bind(this)
    this.updateTokens = this.updateTokens.bind(this)
    this.refreshAuthTokens = this.refreshAuthTokens.bind(this)
    this.runTokenRefreshService = this.runTokenRefreshService.bind(this)
    this.stopTokenRefreshService = this.stopTokenRefreshService.bind(this)
  }

  init(aToken, rToken) {
    this.updateTokens(aToken, rToken)
    this.runTokenRefreshService()
  }

  login(username, password, successCallback, errCallback) {
    this.authClient.mutate({
      mutation: LOGIN_MUTATION,
      fetchPolicy: 'no-cache',
      variables: { username, password }
    })
      .then(({ data }) => {
        this.init(data.tokenAuth.token, data.tokenAuth.refreshToken)
        successCallback()
      })
      .catch(error => {
        errCallback(error)
      })
  }

  logout() {
    this.revokeToken()
    this.reset()
  }

  reset() {
    this.stopTokenRefreshService()
    this.clearTokens()
    this.authClient.resetStore()
  }

  updateTokens(aToken, rToken) {
    authContext.setTokens(aToken, rToken)
  }

  get userIsLoggedIn() {
    return authContext.hasTokens
  }

  clearTokens() {
    if (this.tokenRefreshServiceIsRunning)
      throw Error('TokenRefreshService is running. Stop it first')
    authContext.setTokens(undefined, undefined)
  }

  refreshAuthTokens() {
    this.authClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      fetchPolicy: 'no-cache',
      variables: { refreshToken: authContext.refreshToken }
    })
    .then(({ data }) => {
      this.updateTokens(data.refreshToken.token, data.refreshToken.refreshToken)
    })
    .catch(error => {
      console.error(error)
    })
  }

  revokeToken() {
    this.authClient.mutate({
      mutation: REVOKE_TOKEN_MUTATION,
      variables: { refreshToken: authContext.refreshToken }
    })
  }

  get tokenRefreshServiceIsRunning() {
    return Boolean(this.timerID)
  }

  runTokenRefreshService(refreshDelay=tokenRefreshDelta) {
    if (!this.userIsLoggedIn)
      throw Error('runTokenRefreshService called when user not logged in')

    if (this.tokenRefreshServiceIsRunning) {
      console.warn('runTokenRefreshService called when already running. Ignoring this call...')
      return
    }

    this.timerID = setInterval(this.refreshAuthTokens, refreshDelay)
  }

  stopTokenRefreshService() {
    clearInterval(this.timerID)
    this.timerID = null
  }
}

const authService = new AuthService()
export default authService
