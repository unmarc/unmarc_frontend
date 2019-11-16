import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../common/components'
import Admin from '../admin/Admin'
import StaffAdmin from '../admin/StaffAdmin'

export function Routes() {
  return (
    <Switch>
        <Route exact path='/'>
            <Home />
        </Route>
        <Route exact path='/admin'>
            <Admin />
        </Route>
        <Route exact path='/admin/staff'>
            <StaffAdmin />
        </Route>
    </Switch>
  )
}
