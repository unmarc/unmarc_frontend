import { useState } from 'react'
import isEmpty from 'lodash.isempty'

import authService from '../auth/authService'


export function useAuthState() {
  // set isLoggedIn to `true` by default. We don't know if
  // previous session exists because httponly cookie. If not
  // logged in, will fail automatically on first call to private api
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userInfo, _setUserInfo] = useState({})

  const setUserInfo = infoObj => {
    if (isEmpty(infoObj)) {
      throw Error(`setUserInfo called with invalid argument ${infoObj}`)
    }
    _setUserInfo(infoObj)
  }
  const unsetUserInfo = () => _setUserInfo({})

  const resetAuthState = () => {
    setIsLoggedIn(false)
    unsetUserInfo()
  }

  const logout = () => {
    authService.logout()
    resetAuthState()
  }

  return [isLoggedIn, userInfo, setIsLoggedIn, setUserInfo, logout, resetAuthState]
}
