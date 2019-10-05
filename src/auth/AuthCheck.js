import React, { useState } from 'react';

import Login from './Login'
import authService from './authService'


export function AuthCheck(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.userIsLoggedIn)

  const logout = () => {
    authService.logout()
    setIsLoggedIn(false)
  }

  const handleSuccessfulLogin = _ => {
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={ logout }>
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
  const AuthWrapper = () => <AuthCheck children={ <WrappedComponent/> }/>
  return AuthWrapper
}

export { withAuth, AuthCheck }
*/