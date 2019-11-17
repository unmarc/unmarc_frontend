import React from 'react'

import { wrapLayout } from '../common/components/Layout'
import StaffList from './StaffList'


export default function StaffAdmin() {
    return wrapLayout(
      <div>
          <br />
          <h2>Staff</h2>
          <br />
          <StaffList />
      </div>
    )
}
