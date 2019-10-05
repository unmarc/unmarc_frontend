import React, { useState } from 'react'
import authService from './authService'


export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    authService.login(username, password, props.onSuccess, alert)
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
      <button onClick={ login }>Log In</button>
    </div>
  )
}
