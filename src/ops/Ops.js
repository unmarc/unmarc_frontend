import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { AuthContext } from '../auth/'
import authService from '../auth/authService'


const TP_QUERY = gql`
  query {
    me {
      id
      username
    }
  }
`

function Ops() {
  const authContext = useContext(AuthContext)

  const logout = () => {
    authContext.setIsLoggedIn(false)
    authService.logout()
  }

  return (
      <div>
        <h1>Staff Operations</h1>
        <Query query={ TP_QUERY } fetchPolicy='no-cache' errorPolicy='all'>
          {
            ({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) {
                return <div>
                  <pre>{`${error}`}</pre>
                </div>
              }

              const { me } = data
              return <div>
                <p>
                  { me.id }, { me.username }
                </p>
                <button onClick={ logout }>Log Out</button>
              </div>
            }
          }
        </Query>
        <Link to='/'>Home</Link>
      </div>
  )
}

export default Ops
