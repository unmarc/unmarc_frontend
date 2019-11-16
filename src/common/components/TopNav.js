import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link } from 'react-router-dom'
import isNil from 'lodash.isnil'

import { AuthContext } from '../../auth'

const ifAdminGetNavItem = ({ userInfo: { staff } }) =>
  !isNil(staff) && staff.isLibraryAdmin &&
  <Nav.Item>
      <Link to="/admin">Admin</Link>
  </Nav.Item>


export default function TopNav() {
    const authContext = useContext(AuthContext)
    return (
      <Navbar className="justify-content-end">
          <Nav className="align-items-center">
              { ifAdminGetNavItem(authContext) }
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Nav.Item>
                  <DropdownButton
                    title={ authContext.userInfo.name || '' }
                    variant='light'
                    id='#userDropDown'
                  >
                      <Dropdown.Item
                        eventKey="1"
                        onClick={ () => authContext.logout() }
                      >
                          Sign out
                      </Dropdown.Item>
                  </DropdownButton>
              </Nav.Item>
          </Nav>
      </Navbar>
    )
}
