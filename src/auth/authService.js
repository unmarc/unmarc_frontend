import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'
import gql from 'graphql-tag'
import { parseJwt } from './jwtDecode'
import { csrfHeaderLink, httpLink } from '../common/apolloLinks'


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

const client = new ApolloClient({
  link: from([csrfHeaderLink, httpLink]),
  cache: new InMemoryCache(),
})

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
      payload
    }
  }
`

class AuthService {
  constructor() {
    this.refreshIntervalVar = undefined
    this.tokenNeedsRefresh = this.tokenNeedsRefresh.bind(this)
    this.updateTokens = this.updateTokens.bind(this)
    this.refreshTokenIfExpired = this.refreshTokenIfExpired.bind(this)
    this.runTokenRefreshService = this.runTokenRefreshService.bind(this)
    this.stopTokenRefreshService = this.stopTokenRefreshService.bind(this)
  }

  get userIsLoggedIn() {
    return authContext.hasTokens
  }

  updateTokens(aToken, rToken) {
    authContext.setTokens(aToken, rToken)
  }

  clearTokens() {
    if (this.tokenRefreshServiceIsRunning)
      throw Error('TokenRefreshService is running. Stop it first')
    authContext.setTokens(undefined, undefined)
  }

  tokenNeedsRefresh(aToken) {
    return Date.now() >= (parseJwt(aToken).exp * 1000) - 30000
  }

  refreshTokenIfExpired() {
    if (this.tokenNeedsRefresh(authContext.accessToken)) {
      client.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        fetchPolicy: 'no-cache',
        variables: { refreshToken: authContext.refreshToken }
      })
      .then(({ data }) => {
        this.updateTokens(
          data.refreshToken.token,
          data.refreshToken.refreshToken
        )
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

  get tokenRefreshServiceIsRunning() {
    return Boolean(this.refreshIntervalVar)
  }

  runTokenRefreshService() {
    if (!authContext.hasTokens)
      throw Error('runTokenRefreshService called before authContext initialisation')

    if (this.tokenRefreshServiceIsRunning) {
      console.warn('runTokenRefreshService called when already running. Ignoring this call...')
      return
    }

    this.refreshIntervalVar = setInterval(this.refreshTokenIfExpired, 5000)
  }

  stopTokenRefreshService() {
    clearInterval(this.refreshIntervalVar)
    this.refreshIntervalVar = undefined
  }
}

const authService = new AuthService()
export default authService
