import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from '../common/components'
import { Admin } from '../admin/Admin'

export function Routes() {
  return (
    <>
      <Route exact path='/' component={ Home }/>
      <Route exact path='/admin' component={ Admin }/>
    </>
  )
}
