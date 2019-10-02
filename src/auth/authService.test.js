import { assert } from "chai"
import authService, { authContext } from "./authService"
const jwt = require('jsonwebtoken')


afterEach(() => {
  authContext.setTokens(undefined,undefined)
  authService.stopTokenRefreshService()
})

describe("authContext", () => {
  it("hasTokens returns correct status", () => {
    assert.isFalse(authContext.hasTokens, 'returns false when tokens are unset')
    authContext.setTokens('abcd', 'efgh')
    assert.isTrue(authContext.hasTokens, 'returns true after tokens are set')
  })
})

describe("authService", () => {
  it("updateTokens updates authContext tokens", () => {
    assert.isUndefined(authContext.accessToken, 'accessToken is undefined initially')
    assert.isUndefined(authContext.refreshToken, 'refreshToken is undefined initially')
    authService.updateTokens('abcd', 'efgh')
    assert.strictEqual(authContext.accessToken, 'abcd', 'accessToken is set appropriately')
    assert.strictEqual(authContext.refreshToken, 'efgh', 'refreshToken is set appropriately')
  })

  it("userIsLoggedIn returns correct status", () => {
    assert.isUndefined(authContext.accessToken, 'accessToken is undefined initially')
    assert.isUndefined(authContext.refreshToken, 'refreshToken is undefined initially')
    assert.isFalse(authService.userIsLoggedIn, 'user is not logged in')
    authService.updateTokens('abcd', 'efgh')
    assert.isTrue(authService.userIsLoggedIn, 'user is logged in')
  })

  it("clearTokens unsets authContext tokens", () => {
    authService.updateTokens('abcd', 'efgh')
    authService.clearTokens()
    assert.isUndefined(authContext.accessToken, 'accessToken is undefined')
    assert.isUndefined(authContext.refreshToken, 'refreshToken is undefined')
  })

  it("clearTokens throws error if token refresh service is running and prevents unsetting of tokens", () => {
    authService.updateTokens('abcd', 'efgh')
    authService.runTokenRefreshService()
    assert.throws(authService.clearTokens.bind(authService, 'clearTokens'), 'TokenRefreshService is running. Stop it first')
    assert.exists(authContext.accessToken, 'accessToken exists')
    assert.exists(authContext.refreshToken, 'refreshToken exists')
    authService.stopTokenRefreshService()
  })

  it('tokenNeedsRefresh returns false if expiry far off', () => {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60, // expire 1 minute from now
        data: 'foobar'
      }, 'secret'
    )
    assert.isFalse(authService.tokenNeedsRefresh(token, 30000), 'no refresh needed')
  })

  it('tokenNeedsRefresh returns true if expiry coming up soon (within offset)', () => {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 20, // expire 20 seconds from now
        data: 'foobar'
      }, 'secret'
    )
    assert.isTrue(authService.tokenNeedsRefresh(token, 30000), 'refresh needed')
  })

  it('tokenRefreshServiceIsRunning reports status accurately', () => {
    assert.isUndefined(authService.refreshIntervalVar)
    assert.isFalse(authService.tokenRefreshServiceIsRunning, 'false when refreshIntervalVar is unset')
    authService.refreshIntervalVar = 1
    assert.isTrue(authService.tokenRefreshServiceIsRunning, 'true when refreshIntervalVar is set')
  })

  it('runTokenRefreshService throws error if called when user is not logged in', () => {
    assert.isFalse(authService.userIsLoggedIn, 'user is not logged in')
    assert.throws(authService.runTokenRefreshService.bind(authService, 'runTokenRefreshService'),
      'runTokenRefreshService called when user not logged in'
    )
  })

  it('runTokenRefreshService outputs warning when called twice', () => {
    let consoleOutput = ''
    let storeWarning = input => (consoleOutput += input)
    console['warn'] = jest.fn(storeWarning)
    authService.updateTokens('abcd', 'efgh')
    // first call
    authService.runTokenRefreshService()
    assert.strictEqual(consoleOutput, '', 'no warning')
    // second call
    authService.runTokenRefreshService()
    assert.strictEqual(consoleOutput, 'runTokenRefreshService called when already running. Ignoring this call...', 'warning is thrown')
  })

  it('runTokenRefreshService runs normally when all conditions satisfied', () => {
    authService.updateTokens('abcd', 'efgh')
    authService.runTokenRefreshService()
    assert.isTrue(authService.tokenRefreshServiceIsRunning)
  })

  it('stopTokenRefreshService clears interval', () => {
    authService.updateTokens('abcd', 'efgh')
    authService.runTokenRefreshService()
    authService.stopTokenRefreshService()
    assert.isFalse(authService.tokenRefreshServiceIsRunning)
    assert.isUndefined(authService.refreshIntervalVar)
  })

})
