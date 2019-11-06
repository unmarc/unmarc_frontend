import React, { useState } from 'react'
import isEmpty from 'lodash.isempty'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import authService from './authService'
import { JumbotronXYCentered } from '../common/components/JumbotronXYCentered'


export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')

    const login = (e) => {
        e.preventDefault()
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
      <JumbotronXYCentered>
          <div
            id="login-box"
            className="border rounded full-centered-parent-vertical"
          >
              <h6>Staff</h6>
              <br/>
              <Form
                id="login-form"
                onSubmit={ login }
                className="full-centered-parent-vertical w-100"
              >
                  <Form.Group className="w-100">
                      <Form.Control
                        onChange={ e => setUsername(e.target.value) }
                        type="text"
                        name="username"
                        placeholder="Username"
                      />
                  </Form.Group>
                  <Form.Group className="w-100">
                      <Form.Control
                        onChange={ e => setPassword(e.target.value) }
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                  </Form.Group>
                  <Form.Group
                    className="w-100 text-center"
                    style={{ color: 'red', fontSize: 'small' }}
                  >
                      { authError }
                  </Form.Group>
                  <Form.Group>
                      <Button variant="primary" type="submit">
                          Login
                      </Button>
                  </Form.Group>
              </Form>
          </div>
      </JumbotronXYCentered>
    )
}
