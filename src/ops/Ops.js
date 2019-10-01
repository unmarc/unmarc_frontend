import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Auth } from '../auth/'


const TP_QUERY = gql`
  query {
    me {
      id
      username
    }
  }
`

function Ops() {
  return (
    <Auth>
      <div>
        <h1>Staff Operations</h1>
        <Query query={ TP_QUERY } fetchPolicy='no-cache'>
          {
            ({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) {
                console.error(error)
                return <div>Error</div>
              }

              const { me } = data
              return <p>{ me.id }, { me.username }</p>
            }
          }
        </Query>
        <Link to='/'>Home</Link>
      </div>
    </Auth>
  )
}

export default Ops
