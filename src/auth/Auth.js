import React from 'react';
import { connect } from "react-redux";

import Login from './Login'
import { setAuthToken } from './ducks'


function AuthCheck(props) {
  const isLoggedIn = Boolean(props.authToken)

  const unsetAuthToken = () => {
    props.setAuthToken(undefined)
  }

  if (isLoggedIn) {
    return (
      <div>
        <button
          onClick={ unsetAuthToken }
        >
          Log Out
        </button>
        { props.children }
      </div>
    )
  }

  return <Login/>
}

const mapStateToProps = state => ({
  authToken: state.auth.user.authToken,
});

export const Auth = connect(mapStateToProps, { setAuthToken })(AuthCheck)

/*
function withAuth(WrappedComponent) {
  const AuthWrapper = () => <Auth children={ <WrappedComponent/> }/>
  return AuthWrapper
}

export { withAuth, Auth }
*/