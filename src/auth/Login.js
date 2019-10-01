import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import authService from './authService'


const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const saveToken = data => {
    authService.updateTokens(data.tokenAuth.token, data.tokenAuth.refreshToken)
    props.onSuccess()
  }

  return (
    <div>
      <div>
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
      </div>
      <div>
        <Mutation
          mutation={ LOGIN_MUTATION }
          variables={ { username, password } }
          onCompleted={ data => saveToken(data) }
        >
          { mutation => <button onClick={ mutation }>Log In</button> }
        </Mutation>
      </div>
    </div>
  )
}
