import React, { useState } from 'react';
import { connect } from "react-redux";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { setAuthToken } from './ducks'


const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const saveToken = async data => {
    const { token } = data.tokenAuth
    props.setAuthToken(token)
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

export default connect(null, { setAuthToken })(Login)