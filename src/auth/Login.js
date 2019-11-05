import React, { useState } from 'react'
import isEmpty from 'lodash.isempty'
import Jumbotron from 'react-bootstrap/Jumbotron'

import authService from './authService'


export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')

    const login = () => {
        !isEmpty(authError) && setAuthError('')

        authService
          .login(username, password)
          .then(response => {
              if (response.ok) {
                  props.onSuccess()
              }
              else if (response.status === 401)
                  setAuthError('Invalid username/password')
              else
                  setAuthError("Oops... something didn't go as expected")
          })
          .catch(alert)
    }

    return (
      <Jumbotron className="full-viewport-height">
          <div id="login-box">
              <input
                onChange={ e => setUsername(e.target.value) }
                type="text"
                placeholder="Username: "
              />
              <input
                onChange={ e => setPassword(e.target.value) }
                type="password"
                placeholder="Password: "
              />
              <button onClick={ login }>Log In</button>
              { authError && <span style={ { color: 'red' } }>{ authError }</span> }
          </div>
      </Jumbotron>
    )
}
