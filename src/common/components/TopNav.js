import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { AuthContext } from '../../auth'


export default function TopNav() {
  const authContext = useContext(AuthContext)
  return (
    <Navbar>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{ authContext.userInfo.username }</Navbar.Text>
        <Button onClick={ () => authContext.logout() } variant="link">logout</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}
