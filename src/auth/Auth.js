import React, { useState } from 'react';

import Login from './Login'
import authService from './authService'


export function Auth(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.userIsLoggedIn)

  const resetAuthState = () => {
    authService.stopTokenRefreshService()
    authService.clearTokens()
    setIsLoggedIn(false)
  }

  const handleSuccessfulLogin = () => {
    if (!authService.tokenRefreshServiceIsRunning) {
      authService.runTokenRefreshService()
    }
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={ resetAuthState }>
          Log Out
        </button>
        { props.children }
      </div>
    )
  }

  return <Login onSuccess={ handleSuccessfulLogin }/>
}

/*
function withAuth(WrappedComponent) {
  const AuthWrapper = () => <Auth children={ <WrappedComponent/> }/>
  return AuthWrapper
}

export { withAuth, Auth }
*/