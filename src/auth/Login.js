import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'


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
          onCompleted={ data => props.onSuccess(data.tokenAuth) }
          onError={ error => alert(error.graphQLErrors[0].message) }
        >
          { mutation => <button onClick={ mutation }>Log In</button> }
        </Mutation>
      </div>
    </div>
  )
}
