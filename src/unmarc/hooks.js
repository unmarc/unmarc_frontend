import { useState, useEffect } from 'react'
import isEmpty from 'lodash.isempty'

import authService from '../auth/authService'


export function useAuth(apolloClient) {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        isInitializing: true,
        networkError: false
    })
    const [userInfo, _setUserInfo] = useState({})

    const setInitializing = bool =>
      setAuthState(prevState => ({ ...prevState, isInitializing: bool }))

    const setIsLoggedIn = bool =>
      setAuthState(prevState => ({ ...prevState, isLoggedIn: bool }))

    const setNetworkError = bool =>
      setAuthState(prevState => ({ ...prevState, networkError: bool }))

    const setUserInfo = infoObj => {
        if (isEmpty(infoObj)) {
            throw Error(`setUserInfo called with invalid argument ${infoObj}`)
        }
        _setUserInfo(infoObj)
    }
    const unsetUserInfo = () => _setUserInfo({})

    const resetUserSession = () => {
        setIsLoggedIn(false)
        unsetUserInfo()
    }

    const logout = () => authService.logout().then(resetUserSession)

    const handleIfNonOk = response => {
        if (!response.ok) throw Error('ERROR while fetching')
    }

    const handleFetchError = error => {
        console.error(error.message)
        setNetworkError(true)
    }

    const fetchAuthStatus = () =>
      fetch('/auth-status/')
        .then(response => {
            handleIfNonOk(response)
            return response.json()
        })
        .then(({ userIsLoggedIn }) => {
            userIsLoggedIn ?
              setAuthState(prevState => ({
                  ...prevState,
                  isInitializing: false,
                  isLoggedIn: true
              }))
              :
              setInitializing(false)
        })
        .catch(handleFetchError)

    useEffect(() => {
        if (!authState.networkError && authState.isInitializing) {
            // First ever API call. Sets CSRF cookie in the browser.
            // Without this, all POST requests will fail
            fetch('/_h/', { method: 'HEAD' })
              .then(response => {
                  handleIfNonOk(response)
                  fetchAuthStatus()
              })
              .catch(handleFetchError)
        }
        else if (authState.isLoggedIn && isEmpty(userInfo)) {
            authService.fetchUserInfo(apolloClient, setUserInfo)
        }
    })

    return { authState, userInfo, setIsLoggedIn, logout, resetUserSession }
}
