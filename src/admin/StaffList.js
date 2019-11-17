import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'

import { AuthContext } from '../auth'
import UhOhErrorAlert from '../common/components/UhOhErrorAlert'


const GET_STAFF = gql`
{
  allStaff {
    user {
      id
      username
      name
      email
      dateJoined
    }
    isLibraryAdmin
    branches {
      name
    }
  }
}
`

export default function StaffList() {
    const { loading, error, data } = useQuery(GET_STAFF)
    const { userInfo } = React.useContext(AuthContext)

    if (loading) return <span>Loading...</span>
    if (error) return <UhOhErrorAlert />

    return (
      <Table>
          <thead>
          <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Access</th>
              <th>Branch</th>
              <th>Added on</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
              data.allStaff.map(staff => (
                <tr key={ staff.user.id }>
                    <td>
                        { staff.user.username } &nbsp;&nbsp;&nbsp;
                        { userInfo.username === staff.user.username && <Badge variant="info">You</Badge> }
                    </td>
                    <td>
                        { staff.user.name }
                    </td>
                    <td>
                        { staff.user.email || '-' }
                    </td>
                    <td>
                        { staff.isLibraryAdmin ? 'Administrator' : 'Staff' }
                    </td>
                    <td>
                        { staff.branches.map(branch => branch.name).join(', ') }
                    </td>
                    <td>
                        { new Date(staff.user.dateJoined).toDateString().split(' ').slice(1).join(' ') }
                    </td>
                    <td>...</td>
                </tr>
              ))
          }
          </tbody>
      </Table>
    )
}
